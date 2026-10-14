import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { store, nextId, publicUser } from "../data/store.js";
import { HttpError } from "../utils/errors.js";

export async function registerVolunteer({ name, email, password, skills = [] }) {
  if (!name?.trim() || !email?.trim() || !password) throw new HttpError(400, "Name, email and password are required.");
  if (password.length < 8) throw new HttpError(400, "Password must contain at least 8 characters.");
  const normalizedEmail = email.trim().toLowerCase();
  if (store.users.some((user) => user.email.toLowerCase() === normalizedEmail)) throw new HttpError(409, "An account with this email already exists.");
  const user = { id: nextId("usr"), name: name.trim(), email: normalizedEmail, passwordHash: await bcrypt.hash(password, 10), role: "volunteer", skills: Array.isArray(skills) ? skills : [], hours: 0 };
  store.users.push(user);
  return issueSession(user);
}

export async function login({ email, password, role }) {
  if (!email || !password) throw new HttpError(400, "Email and password are required.");
  const user = store.users.find((item) => item.email.toLowerCase() === email.trim().toLowerCase());
  if (!user || !(await bcrypt.compare(password, user.passwordHash)) || (role && user.role !== role)) {
    throw new HttpError(401, "Invalid email, password, or role.");
  }
  return issueSession(user);
}

function issueSession(user) {
  const token = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: "7d" });
  return { token, user: publicUser(user) };
}
