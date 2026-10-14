import { Router } from "express";
import { store } from "../data/store.js";
import { requireAuth } from "../middleware/auth.js";
import { HttpError } from "../utils/errors.js";

const router = Router();
router.get("/", requireAuth, (req, res) => res.json({ notifications: store.notifications.filter((item) => item.userId === req.user.id) }));
router.patch("/read-all", requireAuth, (req, res) => {
  store.notifications.filter((item) => item.userId === req.user.id).forEach((item) => { item.read = true; });
  res.json({ message: "All notifications marked as read." });
});
router.patch("/:id/read", requireAuth, (req, res) => {
  const notification = store.notifications.find((item) => item.id === req.params.id && item.userId === req.user.id);
  if (!notification) throw new HttpError(404, "Notification not found.");
  notification.read = true;
  res.json({ notification });
});
export default router;
