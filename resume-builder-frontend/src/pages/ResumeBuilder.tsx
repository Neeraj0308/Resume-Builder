/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkles,
  User,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PersonalInfoForm from "../components/personalInfoForm";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ResumePreview from "../components/ResumePreview";
import ExperienceForm from "../components/Experience";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import { getJson, postJson, putJson } from "../services/api";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [resumeData, setResumeData] = useState({
    id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "minimal",
    accent_color: "#3982f6",
    public: false,
  });

  // Auto-dismiss toast after 3 seconds
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const loadExistingResume = async () => {
    if (!resumeId) return;

    try {
      const data = await getJson<{ resume: any }>("/api/resume/" + resumeId);
      const resume = data.resume;

      setResumeData({
        id: resume?._id || "",
        title: resume?.title || "",
        personal_info: resume?.personalInfo || {},
        professional_summary: resume?.professionalSummary || "",
        experience: resume?.experience || [],
        education: resume?.education || [],
        project: resume?.projects || [],
        skills: resume?.skills || [],
        template: resume?.template || "classic",
        accent_color: resume?.accentColor || "#3B82f6",
        public: resume?.public || false,
      });
      document.title = resume?.title || document.title;
    } catch (error) {
      console.error(error);
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

   
  useEffect(() => {
    if (resumeId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadExistingResume();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ resumeId]);

  const templates = [
    { id: "classic", name: "Classic" },
    { id: "modern", name: "Modern" },
    { id: "sidebar", name: "Sidebar" },
    { id: "photoheader", name: "Photoheader" },
    { id: "cardtemplate", name: "Cardtemplate" },
  ];

  const accentColor = [
    { id: "#2563EB", name: "Corporate Blue" },
    { id: "#0D9488", name: "Teal Slate" },
    { id: "#1E3A5F", name: "Deep Navy" },
    { id: "#059669", name: "Emerald Green" },
    { id: "#D97706", name: "Burnt Amber" },
    { id: "#7C3AED", name: "Royal Purple" },
    { id: "#DC2626", name: "Crimson Red" },
    { id: "#475569", name: "Slate Gray-Blue" },
    { id: "#DB2777", name: "Rose Pink" },
    { id: "#166534", name: "Forest Green" },
  ];

  const activeSection = sections[activeSectionIndex];
  const progress =
    sections.length > 1
      ? (activeSectionIndex * 100) / (sections.length - 1)
      : 0;

  const downloadResume = () => {
    window.print();
  };

  const handleSave = async () => {
    const personalInfo = resumeData.personal_info as {
      full_name?: string;
      firstName?: string;
      name?: string;
      email?: string;
    };

    const fullName =
      personalInfo.full_name?.trim() ||
      personalInfo.firstName?.trim() ||
      personalInfo.name?.trim();
    const email = personalInfo.email?.trim();

    if (!fullName || !email) {
      setToast({
        type: "error",
        message: "Please enter the required fields first",
      });
      return;
    }

    try {
      const payload = {
        title: resumeData.title || "Untitled Resume",
        personalInfo: resumeData.personal_info,
        professionalSummary: resumeData.professional_summary,
        experience: resumeData.experience,
        education: resumeData.education,
        projects: resumeData.project,
        skills: resumeData.skills,
        template: resumeData.template,
        accentColor: resumeData.accent_color,
        public: resumeData.public,
      };

      if (resumeData.id) {
        await putJson(`/api/resume/${resumeData.id}`, payload);
      } else {
        const data = await postJson<{ resume?: { _id?: string } }>(
          "/api/resume",
          payload,
        );
        if (data.resume?._id) {
          setResumeData((prev) => ({
            ...prev,
            id: data.resume!._id || prev.id,
          }));
        }
      }

      setToast({ type: "success", message: "Saved successfully" });
      setActiveSectionIndex((prevIndex) =>
        Math.min(prevIndex + 1, sections.length - 1),
      );
    } catch (error) {
      console.error(error);
      setToast({
        type: "error",
        message: "Something went wrong while saving",
      });
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeft className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel - Form*/}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* progress bar using active sectionIndex */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-linear-to-r from-green-500 to-green-600 border-none transition-all duration-2000"
                style={{ width: `${progress}%` }}
              />
              {/* Section Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div>
                  {
                    <div className="flex items-center gap-3">
                      <label className="font-medium"></label>

                      <select
                        value={resumeData.template}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            template: e.target.value,
                          }))
                        }
                        className="border rounded-lg px-1 py-1"
                      >
                        {templates.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      <div>
                        {" "}
                        <select
                          value={resumeData.accent_color}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              accent_color: e.target.value,
                            }))
                          }
                          className="border rounded-lg px-1 py-1"
                        >
                          {accentColor.map((item) => (
                            <option
                              key={item.id}
                              value={item.id}
                              style={{ color: item.id }}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  }
                </div>
                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.max(prevIndex - 1, 0),
                        )
                      }
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      disabled={activeSectionIndex === 0}
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.min(prevIndex + 1, sections.length - 1),
                      )
                    }
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all  ${activeSectionIndex === sections.length - 1 ? "opacity-50" : ""}`}
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
              <div>
                {/* Form Content */}
                <div className="space-y-6">
                  {activeSection.id === "personal" && (
                    <PersonalInfoForm
                      data={resumeData.personal_info}
                      onChange={(data: any) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personal_info: data,
                        }))
                      }
                    />
                  )}

                  {activeSection.id === "summary" && (
                    <ProfessionalSummaryForm
                      data={resumeData.professional_summary}
                      onChange={(data: any) =>
                        setResumeData((prev) => ({
                          ...prev,
                          professional_summary: data,
                        }))
                      }
                      setResumeData={setResumeData}
                    />
                  )}

                  {activeSection.id === "experience" && (
                    <ExperienceForm
                      data={resumeData.experience}
                      onChange={(data: any) =>
                        setResumeData((prev) => ({ ...prev, experience: data }))
                      }
                    />
                  )}

                  {activeSection.id === "education" && (
                    <EducationForm
                      data={resumeData.education}
                      onChange={(data: any) =>
                        setResumeData((prev) => ({ ...prev, education: data }))
                      }
                    />
                  )}

                  {activeSection.id === "projects" && (
                    <ProjectForm
                      data={resumeData.project}
                      onChange={(data: any) =>
                        setResumeData((prev) => ({ ...prev, project: data }))
                      }
                    />
                  )}

                  {activeSection.id === "skills" && (
                    <SkillsForm
                      data={resumeData.skills}
                      onChange={(data: any) =>
                        setResumeData((prev) => ({ ...prev, skills: data }))
                      }
                    />
                  )}

                  <div className="flex items-center justify-between">
                    <div></div>
                    <button
                      onClick={() => handleSave()}
                      className="w-full bg-green-600 rounded-lg "
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
         {/* Right Panel - Preview */}
<div className="lg:col-span-7 max-lg:mt-6">
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-5 pb-5 border-b border-gray-100">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Live Preview
        </h3>
        <p className="text-sm text-gray-500 mt-0.5">
          See how your resume looks in real time
        </p>
      </div>
      <button
        onClick={() => downloadResume()}
        className="group flex items-center gap-2.5 px-5 py-3 text-sm font-semibold text-white bg-linear-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 hover:from-indigo-500 hover:to-indigo-600 active:scale-95 transition-all duration-200"
      >
        <DownloadIcon className="size-4 group-hover:translate-y-0.5 transition-transform duration-200" />
        Download PDF
      </button>
    </div>

   <div className="rounded-lg overflow-hidden bg-gray-50 p-4">
      <ResumePreview
        data={resumeData}
        template={resumeData.template}
        accentColor={resumeData.accent_color}
      />
    </div>
  </div>
</div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border min-w-70 max-w-sm ${
              toast.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="size-5 shrink-0 text-green-600" />
            ) : (
              <XCircle className="size-5 shrink-0 text-red-600" />
            )}
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button
              onClick={() => setToast(null)}
              className="text-xs opacity-60 hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;