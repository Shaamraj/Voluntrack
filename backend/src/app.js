import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import ngoRoutes from "./routes/ngo.routes.js";
import eventRoutes from "./routes/event.routes.js";
import registrationRoutes from "./routes/registration.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import registrationAttendanceRoutes from "./routes/registration-attendance.routes.js";
import fundingRoutes from "./routes/funding.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();
app.use(cors({ origin: env.clientUrl }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => res.json({ name: "VolunTrack API", status: "running", health: "/api/health" }));
app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "VolunTrack API", timestamp: new Date().toISOString() }));
app.use("/api/auth", authRoutes);
app.use("/api/ngos", ngoRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/registrations", registrationAttendanceRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/funding", fundingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);

app.use((_req, res) => res.status(404).json({ message: "API route not found." }));
app.use((error, _req, res, _next) => {
  const status = Number(error.status) || 500;
  if (status >= 500) console.error(error);
  res.status(status).json({ message: status >= 500 ? "An unexpected server error occurred." : error.message });
});

export default app;
