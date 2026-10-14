import { login, registerVolunteer } from "../services/auth.service.js";
import { store, publicUser } from "../data/store.js";
import { HttpError } from "../utils/errors.js";

export async function register(req, res) {
  const result = await registerVolunteer(req.body);
  res.status(201).json(result);
}

export async function signIn(req, res) {
  res.json(await login(req.body));
}

export function me(req, res) {
  const user = store.users.find((item) => item.id === req.user.id);
  if (!user) throw new HttpError(404, "User not found.");
  res.json({ user: publicUser(user) });
}
