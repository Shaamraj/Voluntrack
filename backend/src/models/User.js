import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["volunteer", "ngo", "admin"], required: true },
  skills: { type: [String], default: [] },
  hours: { type: Number, default: 0 },
  ngoId: { type: mongoose.Schema.Types.ObjectId, ref: "NGO" },
  verified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
