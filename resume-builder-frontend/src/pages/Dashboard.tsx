import { uploadResumePDF } from "../services/pdfService";

import {
  FilePenIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteJson, getJson, postJson, putJson } from "../services/api.ts";

type Resume = {
  _id: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
  personalInfo?: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const colors = [
    "#9333ea",
    "#3b82f6",
    "#ef4444",
    "#f97316",
    "#14b8a6",
    "#eab308",
    "#10b981",
    "#8b5cf6",
  ];
  const [allResumes, setAllResumes] = useState<Resume[]>([]);
  const [showCreateResume, setShowCreateResume] = useState<boolean>(false);
  const [showUploadResume, setShowUploadResume] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  // const [resume, setResume] = useState<File | null>(null);
  const [editResumeId, setEditResumeId] = useState<string>("");
  // const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [resume, setResume] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const loadAllResumes = async () => {
    try {
      const data = await getJson<{ resumes: Resume[] }>("/api/resume");
      setAllResumes(data.resumes || []);
    } catch (error) {
      console.error(error);
    }
  };

  const createResume = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await postJson<{ resume: Resume }>("/api/resume", {
        title,
        personalInfo: {},
      });

      setShowCreateResume(false);
      setTitle("data.resume.title");
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  // const uploadResume = async (event: React.ChangeEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setShowUploadResume(false);
  //   navigate(`/app/builder/res123`);
  // };

  const uploadResume = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!resume) {
      alert("Please select a PDF.");
      return;
    }

    setIsUploading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        return;
      }

      const data = await uploadResumePDF(resume, token);

      setShowUploadResume(false);

      navigate(`/app/builder/${data.resume._id}`);
    } catch (err) {
      console.error(err);
      setIsUploading(false);
      alert("Resume upload failed.");
    }
  };

  const editTitle = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editResumeId) return;
    try {
      await putJson(`/api/resume/${editResumeId}`, { title });
      setEditResumeId("");
      setTitle("");
      loadAllResumes();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteResume = async (resumeId: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this resume ?",
    );
    if (confirm) {
      try {
        await deleteJson(`/api/resume/${resumeId}`);
        setAllResumes((prev) =>
          prev.filter((resume) => resume._id !== resumeId),
        );
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome ,Kunal
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className=" w-full
            bg-white
            sm:max-w-36
            h-48
            flex-col
            items-center
            justify-center
            rounded-lg
            gap-2
            text-slate-600
            border-dashed
            border-slate-300
            hover:border-indigo-500
            hover:shadow-lg
            transition-all
            duration-300
            cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-indigo-300 to-indigo-500 text-white rounded-full cursor-pointer" />
            <p className="text-sm group-hover;text-indigo-600 transition-all duration-300">
              {" "}
              Create Resume
            </p>
          </button>
          <button
            onClick={() => setShowUploadResume(true)}
            className="
            w-full
            bg-white
            sm:max-w-36
            h-48
            flex-col
            items-center
            justify-center
            rounded-lg
            gap-2
            text-slate-600
            border-dashed
            border-slate-300
            hover:border-purple-500
            hover:shadow-lg
            transition-all
            duration-300
            cursor-pointer"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-purple-300 to-purple-500 text-white rounded-full cursor-pointer" />
            <p className="text-sm group-hover;text-purple-600 transition-all duration-300">
              {" "}
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="my-6 border-slate-300  sm:w-76.25" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                key={resume._id || index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenIcon
                  className="size-11 transition-all group-hover:scale-105"
                  style={{ color: baseColor }}
                />
                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title || "Untittle"}
                </p>
                <p
                  className="absolute bottom-2 text-xs text-slate-400 group-hover:scale-105 transition-all px-2 duration-300 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 group-hover:flex items-center hidden"
                >
                  <TrashIcon
                    onClick={() => deleteResume(resume._id)}
                    className="size-7  p-1.5 hover:bg-white/50 rounded  transition-colors"
                  />
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title || "");
                    }}
                    className="size-7 text-slate-700 p-1.5 hover:bg-white/50 rounded transition-colors"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center "
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4 p-4">Create Resume</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 focus:border-green-100 ring-green-500"
                required
              />
              <button className="w-full mb-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Create Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center "
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4 p-4">Upload Resume</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 focus:border-green-100 ring-green-500"
                required
              />
              <div>
                <label
                  htmlFor="resume-input"
                  className="block text-sm text-slate-700"
                >
                  Select Resume file
                  <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                    {resume ? (
                      <p className="text-green-700">{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloudIcon className="size-14 stroke-1" />
                        <p>Upload resume</p>
                      </>
                    )}
                  </div>
                </label>
                {/* <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      setResume(file);
                    }
                  }}
                /> */}

                <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  hidden
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setResume(e.target.files[0]);
                    }
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={isUploading}
                className={`w-full mb-4 py-2 rounded text-white flex items-center justify-center gap-2 transition-colors ${
                  isUploading
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isUploading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}

                {isUploading ? "Uploading..." : "Upload Resume"}
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center "
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4 p-4">Edit Resume Title</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 focus:border-green-100 ring-green-500"
                required
              />
              <button className="w-full mb-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Update
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
