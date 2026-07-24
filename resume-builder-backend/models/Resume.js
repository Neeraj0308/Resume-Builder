import mongoose from "mongoose";
import { type } from "node:os";

const resumeSchema = new mongoose.Schema(
  {
    title: [String],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    personalInfo: {
      // firstName: String,
      // lastName: String,
      full_name: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      profession: String,
      website: String,
      portfolio: String,
      summary: String,
      image: {
        type: String,
        default: "",
      },
    },

    education: [
      {
        college: String,
        degree: String,
        location: String,
        startYear: String,
        endYear: String,
      },
    ],

    experience: [
      {
        company: String,
        role: String,
        location: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],

    skills: [String],

    projects: [
      {
        title: String,
        description: String,
        github: String,
        live: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Resume", resumeSchema);
