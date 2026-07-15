import express from "express";
import cors from "cors";
import { json } from "node:stream/consumers";
import authRoutes from "./routes/auth.routes";
import { protect } from "./middlewares/auth.middleware";

const app = express();

app.use(cors());
app.use(express.json());


app.get("/api/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed",
    user: req.user,
  });
});


app.get("/", (req, res) => {
    res.json({
        success: true,
        message:"Backend Running on port 5000"
    })
})

app.use("/api/auth", authRoutes);

export default app;