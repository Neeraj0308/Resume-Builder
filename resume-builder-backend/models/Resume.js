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

    professionalSummary: {
      type: String,
      trim: true,
      default: "",
    },

    education: [
      {
        institution: String,
        degree: String,
        field: String,
        graduation_StartDate: String,
        graduation_EndDate: String,
        gpa: String,
      },
    ],

    experience: [
      {
        company: String,
        position: String,
        start_date: String,
        end_date: String,
        description: String,
        is_current: String,
      },
    ],

    skills: [String],

    projects: [
      {
        name: {
          type: String,
          default: "",
          trim: true,
        },

        type: {
          type: String,
          default: "",
          trim: true,
        },

        description: {
          type: String,
          default: "",
          trim: true,
        },

        link: {
          type: String,
          default: "",
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Resume", resumeSchema);
