import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import slotRoutes from "./routes/slot.routes";
import { protect } from "./middlewares/auth.middleware";

const app = express();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Booking System Backend is running on Port 5000",
  });
});


app.use("/api/auth", authRoutes);


app.use("/api/slots", slotRoutes);


app.get("/api/protected", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

export default app;