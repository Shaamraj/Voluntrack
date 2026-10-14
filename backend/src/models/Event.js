import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  ngoId: { type: mongoose.Schema.Types.ObjectId, ref: "NGO", required: true, index: true },
  title: { type: String, required: true, trim: true },
  category: { type: String, default: "Community" },
  date: { type: String, required: true },
  start: { type: String, default: "09:00" },
  location: { type: String, required: true },
  description: { type: String, default: "" },
  capacity: { type: Number, min: 1, required: true },
  skills: { type: [String], default: [] },
  image: { type: String, default: "" },
  active: { type: Boolean, default: true },
  csrReservedSlots: { type: Number, min: 0, default: 0 }
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
