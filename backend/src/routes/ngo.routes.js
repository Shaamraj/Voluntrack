import { Router } from "express";
import { store, nextId } from "../data/store.js";
import { requireAuth, allowRoles } from "../middleware/auth.js";
import { HttpError } from "../utils/errors.js";

const router = Router();
router.get("/", (req, res) => res.json({ ngos: store.ngos.filter((ngo) => ngo.verified) }));
router.get("/:id", (req, res) => {
  const ngo = store.ngos.find((item) => item.id === req.params.id && item.verified);
  if (!ngo) throw new HttpError(404, "NGO not found.");
  res.json({ ngo });
});
router.post("/applications", requireAuth, allowRoles("ngo"), (req, res) => {
  const { name, location, description, registrationNumber, officialEmail } = req.body;
  if (!name?.trim() || !location?.trim() || !officialEmail?.trim()) throw new HttpError(400, "Organization name, location and official email are required.");
  const application = { id: nextId("app"), userId: req.user.id, name: name.trim(), location: location.trim(), description: description || "", registrationNumber: registrationNumber || "", officialEmail: officialEmail.trim(), status: "PENDING", createdAt: new Date().toISOString() };
  store.ngoApplications.push(application);
  res.status(201).json({ application });
});
export default router;
