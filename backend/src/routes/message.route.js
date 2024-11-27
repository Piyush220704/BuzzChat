import {Router} from "express"
const router = Router();
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";

router.get('/users', protectRoute, getUsersForSidebar);
router.get('/:id', protectRoute, getMessages);

router.post('/send/:id', protectRoute, sendMessage);

export default router;