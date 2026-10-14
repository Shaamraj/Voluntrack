import mongoose from "mongoose";

const fundingSchema = new mongoose.Schema({
  ngoId: { type: mongoose.Schema.Types.ObjectId, ref: "NGO", required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", default: null },
  sponsor: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: 0.01 },
  date: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Confirmed", "Rejected"], default: "Pending" }
}, { timestamps: true });

export default mongoose.models.Funding || mongoose.model("Funding", fundingSchema);
