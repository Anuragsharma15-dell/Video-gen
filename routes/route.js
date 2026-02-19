import { registerUser, loginUser } from "../backend/controller/controller.js";
import { createVideoWithPrompt, getVideos } from "../backend/controller/Video-controller.js";
import { authmiddleware } from "../backend/middleware/authmiddeware.js";

// User routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Video routes
router.post("/prompt", authmiddleware, createVideoWithPrompt);
router.get("/prompt", authmiddleware, getVideos);

export default router;