import express from "express";
import cors from "cors";
import { json } from "node:stream/consumers";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message:"Backend Running on port 5000"
    })
})


export default app;