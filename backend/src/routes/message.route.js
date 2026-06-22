import express from "express";
import { 
    getConversationsForSidebar,
    getMessages,
    sendMessages,
    getUsersForSidebar,
 } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.midddleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.use(protectRoute);

router.get("/users",  getUsersForSidebar);
router.get("/conversations", getConversationsForSidebar);
router.get("/:id",  getMessages);
router.post("/send/:id",  upload.single("media"),  sendMessages);

export default router;