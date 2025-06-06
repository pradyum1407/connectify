import express from "express"
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getMessage, sendMessage } from "../Controller/chat.controller.js";

const router = express.Router();

router.get("/:id",protectedRoute,getMessage)
router.post("/send/:id",protectedRoute,sendMessage)

export default router;