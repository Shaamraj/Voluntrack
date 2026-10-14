import { Router } from "express";
import { store, addNotification } from "../data/store.js";
import { requireAuth, allowRoles } from "../middleware/auth.js";
import { HttpError } from "../utils/errors.js";

const router = Router();
router.post("/:id/check-in", requireAuth, allowRoles("ngo", "admin"), (req, res) => {
  const registration = store.registrations.find((item) => item.id === req.params.id && item.status === "Confirmed");
  if (!registration) throw new HttpError(404, "Confirmed registration not found.");
  const event = store.events.find((item) => item.id === registration.eventId);
  const ngo = store.ngos.find((item) => item.id === event?.ngoId);
  if (req.user.role !== "admin" && ngo?.ownerUserId !== req.user.id && req.user.ngoId !== event?.ngoId) throw new HttpError(403, "You cannot manage attendance for this event.");
  if (registration.checkInTime) throw new HttpError(409, "Volunteer has already checked in.");
  registration.checkInTime = new Date().toISOString();
  registration.status = "Checked-In";
  addNotification(registration.volunteerId, "Attendance checked in", `Your attendance for ${event?.title || "the event"} has been recorded.`);
  res.json({ registration });
});
router.post("/:id/check-out", requireAuth, allowRoles("ngo", "admin"), (req, res) => {
  const registration = store.registrations.find((item) => item.id === req.params.id && item.status === "Checked-In");
  if (!registration || !registration.checkInTime) throw new HttpError(404, "Checked-in registration not found.");
  const event = store.events.find((item) => item.id === registration.eventId);
  const ngo = store.ngos.find((item) => item.id === event?.ngoId);
  if (req.user.role !== "admin" && ngo?.ownerUserId !== req.user.id && req.user.ngoId !== event?.ngoId) throw new HttpError(403, "You cannot manage attendance for this event.");
  const checkout = new Date();
  const checkin = new Date(registration.checkInTime);
  registration.checkOutTime = checkout.toISOString();
  registration.hoursServed = Math.max(0, Math.round(((checkout - checkin) / 3600000) * 100) / 100);
  registration.status = "Completed";
  const volunteer = store.users.find((item) => item.id === registration.volunteerId);
  if (volunteer) volunteer.hours = Math.round(((volunteer.hours || 0) + registration.hoursServed) * 100) / 100;
  addNotification(registration.volunteerId, "Service hours updated", `${registration.hoursServed} service hours were recorded for ${event?.title || "your event"}.`);
  res.json({ registration });
});
export default router;
