import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true },
  description: { type: String, default: "" },
  registrationNumber: { type: String, default: "" },
  officialEmail: { type: String, default: "" },
  verificationStatus: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING" },
  ownerUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.models.NGO || mongoose.model("NGO", ngoSchema);
