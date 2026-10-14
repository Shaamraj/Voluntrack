import { Router } from "express";
import { store, nextId, addNotification } from "../data/store.js";
import { requireAuth, allowRoles } from "../middleware/auth.js";
import { HttpError } from "../utils/errors.js";

const router = Router();
function eventForUser(event, user) {
  if (user.role === "admin") return true;
  const ngo = store.ngos.find((item) => item.id === event.ngoId);
  return user.role === "ngo" && (ngo?.ownerUserId === user.id || user.ngoId === event.ngoId);
}
router.get("/", (req, res) => {
  let events = store.events.filter((event) => event.active);
  if (req.query.category) events = events.filter((event) => event.category.toLowerCase() === String(req.query.category).toLowerCase());
  if (req.query.search) {
    const search = String(req.query.search).toLowerCase();
    events = events.filter((event) => `${event.title} ${event.description} ${event.location} ${event.category}`.toLowerCase().includes(search));
  }
  if (req.query.ngoId) events = events.filter((event) => event.ngoId === req.query.ngoId);
  res.json({ events });
});
router.get("/:id", (req, res) => {
  const event = store.events.find((item) => item.id === req.params.id);
  if (!event) throw new HttpError(404, "Event not found.");
  res.json({ event, ngo: store.ngos.find((ngo) => ngo.id === event.ngoId) || null });
});
router.post("/", requireAuth, allowRoles("ngo", "admin"), (req, res) => {
  const { title, category, date, start, location, description, capacity, skills = [], image, csrReservedSlots = 0 } = req.body;
  if (!title?.trim() || !date || !location?.trim() || !Number.isFinite(Number(capacity)) || Number(capacity) < 1) throw new HttpError(400, "Title, date, location and a positive capacity are required.");
  const ngoId = req.user.role === "admin" ? req.body.ngoId : req.user.ngoId;
  if (!ngoId || !store.ngos.some((ngo) => ngo.id === ngoId && ngo.verified)) throw new HttpError(400, "A verified NGO must be associated with the event.");
  if (Number(csrReservedSlots) < 0 || Number(csrReservedSlots) > Number(capacity)) throw new HttpError(400, "CSR reserved slots must be between zero and capacity.");
  const event = { id: nextId("evt"), ngoId, title: title.trim(), category: category || "Community", date, start: start || "09:00", location: location.trim(), description: description || "", capacity: Number(capacity), registered: 0, skills: Array.isArray(skills) ? skills : [], image: image || "", active: true, csrReservedSlots: Number(csrReservedSlots), createdAt: new Date().toISOString() };
  store.events.unshift(event);
  res.status(201).json({ event });
});
router.patch("/:id", requireAuth, allowRoles("ngo", "admin"), (req, res) => {
  const event = store.events.find((item) => item.id === req.params.id);
  if (!event) throw new HttpError(404, "Event not found.");
  if (!eventForUser(event, req.user)) throw new HttpError(403, "You can only manage your own NGO's events.");
  const allowed = ["title", "category", "date", "start", "location", "description", "capacity", "skills", "image", "active", "csrReservedSlots"];
  for (const key of allowed) if (req.body[key] !== undefined) event[key] = req.body[key];
  event.capacity = Number(event.capacity);
  event.csrReservedSlots = Number(event.csrReservedSlots || 0);
  if (event.capacity < event.registered || event.csrReservedSlots < 0 || event.csrReservedSlots > event.capacity) throw new HttpError(400, "Capacity cannot be below existing registrations, and CSR slots must fit within capacity.");
  res.json({ event });
});
router.delete("/:id", requireAuth, allowRoles("ngo", "admin"), (req, res) => {
  const index = store.events.findIndex((item) => item.id === req.params.id);
  if (index < 0) throw new HttpError(404, "Event not found.");
  if (!eventForUser(store.events[index], req.user)) throw new HttpError(403, "You can only manage your own NGO's events.");
  store.events.splice(index, 1);
  store.registrations = store.registrations.filter((item) => item.eventId !== req.params.id);
  res.json({ message: "Event deleted." });
});
router.post("/:id/register", requireAuth, allowRoles("volunteer"), (req, res) => {
  const event = store.events.find((item) => item.id === req.params.id && item.active);
  if (!event) throw new HttpError(404, "Active event not found.");
  if (store.registrations.some((item) => item.eventId === event.id && item.volunteerId === req.user.id && item.status !== "Cancelled")) throw new HttpError(409, "You are already registered for this event.");
  if (event.registered >= event.capacity) throw new HttpError(409, "This event is full.");
  const registration = { id: nextId("reg"), eventId: event.id, volunteerId: req.user.id, status: "Confirmed", createdAt: new Date().toISOString(), checkInTime: null, checkOutTime: null, hoursServed: 0 };
  store.registrations.push(registration);
  event.registered += 1;
  addNotification(req.user.id, "Registration confirmed", `Your registration for ${event.title} is confirmed.`);
  res.status(201).json({ registration, event });
});
router.delete("/:id/register", requireAuth, allowRoles("volunteer"), (req, res) => {
  const registration = store.registrations.find((item) => item.eventId === req.params.id && item.volunteerId === req.user.id && item.status === "Confirmed");
  if (!registration) throw new HttpError(404, "Active registration not found.");
  registration.status = "Cancelled";
  const event = store.events.find((item) => item.id === registration.eventId);
  if (event) event.registered = Math.max(0, event.registered - 1);
  res.json({ message: "Registration cancelled." });
});
router.get("/:id/registrations", requireAuth, allowRoles("ngo", "admin"), (req, res) => {
  const event = store.events.find((item) => item.id === req.params.id);
  if (!event) throw new HttpError(404, "Event not found.");
  if (!eventForUser(event, req.user)) throw new HttpError(403, "You cannot view registrations for this event.");
  const registrations = store.registrations.filter((item) => item.eventId === event.id && item.status !== "Cancelled").map((item) => ({ ...item, volunteer: (() => { const user = store.users.find((u) => u.id === item.volunteerId); return user ? { id: user.id, name: user.name, email: user.email, skills: user.skills || [] } : null; })() }));
  res.json({ registrations });
});
export default router;
