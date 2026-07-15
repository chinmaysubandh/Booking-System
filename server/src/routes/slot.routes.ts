import { Router } from "express";
import {
  getSlots,
  seedSlots,
} from "../controllers/slot.controller";

const router = Router();

router.post("/seed", seedSlots);

router.get("/", getSlots);

export default router;