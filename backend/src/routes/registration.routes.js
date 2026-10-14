import { Router } from "express";
import { store } from "../data/store.js";
import { requireAuth, allowRoles } from "../middleware/auth.js";

const router = Router();
router.get("/mine", requireAuth, allowRoles("volunteer"), (req, res) => {
  const registrations = store.registrations.filter((item) => item.volunteerId === req.user.id).map((item) => ({ ...item, event: store.events.find((event) => event.id === item.eventId) || null }));
  res.json({ registrations });
});
export default router;
