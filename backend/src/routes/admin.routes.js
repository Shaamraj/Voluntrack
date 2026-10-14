import { Router } from "express";
import { store, nextId } from "../data/store.js";
import { requireAuth, allowRoles } from "../middleware/auth.js";
import { HttpError } from "../utils/errors.js";

const router = Router();
router.use(requireAuth, allowRoles("admin"));
router.get("/summary", (_req, res) => res.json({ summary: {
  volunteers: store.users.filter((user) => user.role === "volunteer").length,
  verifiedNGOs: store.ngos.filter((ngo) => ngo.verified).length,
  activeEvents: store.events.filter((event) => event.active).length,
  registrations: store.registrations.filter((registration) => registration.status !== "Cancelled").length,
  serviceHours: Math.round(store.registrations.reduce((sum, item) => sum + (item.hoursServed || 0), 0) * 100) / 100,
  csrFunding: store.funding.filter((item) => item.status === "Confirmed").reduce((sum, item) => sum + item.amount, 0),
  pendingApplications: store.ngoApplications.filter((item) => item.status === "PENDING").length
} }));
router.get("/ngo-applications", (_req, res) => res.json({ applications: store.ngoApplications }));
router.patch("/ngo-applications/:id", (req, res) => {
  const application = store.ngoApplications.find((item) => item.id === req.params.id);
  if (!application) throw new HttpError(404, "NGO application not found.");
  const status = String(req.body.status || "").toUpperCase();
  if (!["APPROVED", "REJECTED"].includes(status)) throw new HttpError(400, "Status must be APPROVED or REJECTED.");
  application.status = status;
  application.reviewedAt = new Date().toISOString();
  if (status === "APPROVED") {
    let ngo = store.ngos.find((item) => item.ownerUserId === application.userId);
    if (!ngo) {
      ngo = { id: nextId("ngo"), name: application.name, location: application.location, description: application.description, verified: true, ownerUserId: application.userId };
      store.ngos.push(ngo);
    } else ngo.verified = true;
    const user = store.users.find((item) => item.id === application.userId);
    if (user) { user.ngoId = ngo.id; user.verified = true; }
    application.ngoId = ngo.id;
  }
  res.json({ application });
});
export default router;
