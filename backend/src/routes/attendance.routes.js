import { Router } from "express";
import { store } from "../data/store.js";
import { requireAuth, allowRoles } from "../middleware/auth.js";

const router = Router();
router.get("/mine", requireAuth, allowRoles("volunteer"), (req, res) => {
  const records = store.registrations.filter((item) => item.volunteerId === req.user.id && item.checkInTime).map((item) => ({ ...item, event: store.events.find((event) => event.id === item.eventId) || null }));
  res.json({ attendance: records, totalHours: records.reduce((sum, item) => sum + (item.hoursServed || 0), 0) });
});
export default router;
