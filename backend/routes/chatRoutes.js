import express from "express";
import { sendMessage } from "../controllers/chatController.js";

const router = express.Router();

router.post("/sendMessage", sendMessage);

export default router;
