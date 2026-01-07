import mongoose from "mongoose";

/* ---------- SUB SCHEMAS ---------- */

const profileSchema = new mongoose.Schema(
  {
    fullName: String,
    designation: String,
    summary: String,
    profileImage: String, // base64 or stored file path
  },
  { _id: false }
);

const contactSchema = new mongoose.Schema(
  {
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    website: String,
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    company: String,
    role: String,
    startDate: String,
    endDate: String,
    description: String,
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    institution: String,
    degree: String,
    fieldOfStudy: String,
    startYear: String,
    endYear: String,
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    technologies: [String],
    github: String,
    liveDemo: String,
  },
  { _id: false }
);

const certificationSchema = new mongoose.Schema(
  {
    name: String,
    issuer: String,
    year: String,
  },
  { _id: false }
);

const skillSchema = new mongoose.Schema(
  {
    name: String,
    level: { type: Number, min: 0, max: 100 },
  },
  { _id: false }
);

const languageSchema = new mongoose.Schema(
  {
    name: String,
    proficiency: String,
  },
  { _id: false }
);

/* ---------- MAIN RESUME SCHEMA ---------- */

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "Untitled Resume",
    },

    template: {
      name: { type: String, default: "template-one" },
      color: { type: String, default: "#2563eb" },
    },

    profile: profileSchema,
    contact: contactSchema,

    experience: [experienceSchema],
    education: [educationSchema],
    projects: [projectSchema],
    certifications: [certificationSchema],

    skills: [skillSchema],
    languages: [languageSchema],

    /* ✅ INTERESTS SHOULD BE HERE */
    interests: [String],

    /* metadata should always be last */
    meta: {
      lastEdited: { type: Date, default: Date.now },
      isPublic: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
