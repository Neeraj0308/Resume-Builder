/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowLeft,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkles,
  User,
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

  const [saveStatus, setSaveStatus] = useState<"success" | "error" | null>(
    null,
  );
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

  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => {
    if (resumeId) {
      loadExistingResume();
    }
  }, [resumeId]);

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
      setSaveStatus("error");
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

      setSaveStatus("success");
      setActiveSectionIndex((prevIndex) =>
        Math.min(prevIndex + 1, sections.length - 1),
      );
    } catch (error) {
      console.error(error);
      setSaveStatus("error");
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
            <div>{/* --- buttons --- */}</div>
            {/* -- resume preview -- */}
            <div className="lg:col-span-7 max-lg:mt-6">
              <div className=" flex items-center justify-between relative w-full">
                <div></div>
                <button
                  onClick={() => downloadResume()}
                  className="flex items-center gap-2 px-6 py-2 text-xs bg-linear-to-br from-green-100 to to-green-600 rounded-lg ring-green-300 hover:ring transition-colors"
                >
                  <DownloadIcon className="size-4" /> Download
                </button>
              </div>
            </div>
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>

      {saveStatus && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
            {saveStatus === "success" ? (
              <>
                <p className="text-green-600 font-semibold text-lg">
                  Saved successfully
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Your data has been saved.
                </p>
              </>
            ) : (
              <>
                <p className="text-red-600 font-semibold text-lg">
                  Please fill the required data
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Full name and email are required.
                </p>
              </>
            )}
            <button
              onClick={() => setSaveStatus(null)}
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg text-sm"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
