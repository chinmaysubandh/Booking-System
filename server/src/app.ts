import express from "express";
import cors from "cors";
import { json } from "node:stream/consumers";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message:"Backend Running on port 5000"
    })
})


export default app;