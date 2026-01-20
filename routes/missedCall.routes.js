import express from "express";
import { handleMissedCall } from "../controllers/missedCall.controller.js";

const router = express.Router();

router.post("/trigger", handleMissedCall);

export default router;

