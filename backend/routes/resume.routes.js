import express from "express";
import {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../controllers/resume.controller.js";
import upload from "../middleware/uploadMiddleware.js";
import { uploadProfileImage } from "../controllers/resume.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createResume);
router.get("/", protect, getUserResumes);
router.get("/:id", protect, getResumeById);
router.put("/:id", protect, updateResume);
router.delete("/:id", protect, deleteResume);

router.put(
  "/:id/profile-image",
  protect,
  upload.single("image"),
  uploadProfileImage
);


export default router;
