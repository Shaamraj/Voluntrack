import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { store, publicUser } from "../data/store.js";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Authentication required." });
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = store.users.find((item) => item.id === payload.sub);
    if (!user) return res.status(401).json({ message: "Account no longer exists." });
    req.user = publicUser(user);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

export function allowRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You do not have permission to perform this action." });
    }
    next();
  };
}
