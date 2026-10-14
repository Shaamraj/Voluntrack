import { Router } from "express";
import { store, nextId } from "../data/store.js";
import { requireAuth, allowRoles } from "../middleware/auth.js";
import { HttpError } from "../utils/errors.js";

const router = Router();
router.get("/", requireAuth, allowRoles("ngo", "admin"), (req, res) => {
  const funding = req.user.role === "admin" ? store.funding : store.funding.filter((item) => item.ngoId === req.user.ngoId);
  res.json({ funding, total: funding.reduce((sum, item) => sum + Number(item.amount || 0), 0) });
});
router.post("/", requireAuth, allowRoles("ngo", "admin"), (req, res) => {
  const { sponsor, amount, eventId, date, status = "Pending" } = req.body;
  if (!sponsor?.trim() || !Number.isFinite(Number(amount)) || Number(amount) <= 0) throw new HttpError(400, "Sponsor and a positive amount are required.");
  const event = eventId ? store.events.find((item) => item.id === eventId) : null;
  const ngoId = req.user.role === "admin" ? (req.body.ngoId || event?.ngoId) : req.user.ngoId;
  if (!ngoId) throw new HttpError(400, "An NGO must be associated with the funding record.");
  const record = { id: nextId("fund"), ngoId, eventId: eventId || null, sponsor: sponsor.trim(), amount: Number(amount), date: date || new Date().toISOString().slice(0, 10), status };
  store.funding.unshift(record);
  res.status(201).json({ funding: record });
});
export default router;
