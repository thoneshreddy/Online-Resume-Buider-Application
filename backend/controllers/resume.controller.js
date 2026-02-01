import Resume from "../models/Resume.js";
import path from "path";
/* CREATE */
export const createResume = async (req, res) => {
  const resume = await Resume.create({
    userId: req.user._id,
    ...req.body,
  });

  res.status(201).json(resume);
};

/* GET ALL */
export const getUserResumes = async (req, res) => {
  const resumes = await Resume.find({ userId: req.user._id }).sort({
    updatedAt: -1,
  });

  res.json(resumes);
};

/* GET ONE */
export const getResumeById = async (req, res) => {
  const resume = await Resume.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!resume)
    return res.status(404).json({ message: "Resume not found" });

  res.json(resume);
};

/* UPDATE */
export const updateResume = async (req, res) => {
  const resume = await Resume.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  );

  res.json(resume);
};

/* DELETE */
export const deleteResume = async (req, res) => {
  await Resume.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  });

  res.json({ message: "Resume deleted" });
};


