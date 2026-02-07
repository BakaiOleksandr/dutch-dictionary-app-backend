import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import User from "../models/User.js";

const router = Router();

router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).select("-passwordHash");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

export default router;
