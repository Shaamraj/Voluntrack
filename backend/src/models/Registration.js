import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true, index: true },
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  status: { type: String, enum: ["Confirmed", "Cancelled", "Checked-In", "Completed"], default: "Confirmed" },
  checkInTime: { type: Date, default: null },
  checkOutTime: { type: Date, default: null },
  hoursServed: { type: Number, min: 0, default: 0 }
}, { timestamps: true });
registrationSchema.index({ eventId: 1, volunteerId: 1 }, { unique: true });

export default mongoose.models.Registration || mongoose.model("Registration", registrationSchema);
