import express from "express";
import { handleIncomingMessage } from "../controllers/whatsappControllers.js";

const router = express.Router();

router.post("/message", handleIncomingMessage);

export default router;
