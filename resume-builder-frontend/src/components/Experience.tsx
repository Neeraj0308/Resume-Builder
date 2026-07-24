import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { enhanceText } from "../services/aiService";

type Experience = {
  company?: string;
  position?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  is_current?: boolean;
};

const ExperienceForm = ({
  data,
  onChange,
}: {
  data: Experience[];
  onChange: (d: Experience[]) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleAIEnhance = async (index: number) => {
    try {
      setLoading(true);

      const description = data[index]?.description || "";

      if (!description.trim()) {
        alert("Please enter a job description first.");
        return;
      }

      const enhanced = await enhanceText(
        "Professional Experience",
        description,
      );

      updateExperience(index, "description", enhanced);
    } catch (error) {
      console.error(error);
      alert("AI Enhancement Failed");
    } finally {
      setLoading(false);
    }
  };
  const currentMonth = new Date().toISOString().slice(0, 7);
  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (
    index: number,
    field: string,
    value: string | boolean,
  ) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">Add Your Job Experience</p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="size-12 mx-auto text-gray-300" />
          <p>No experience added yet</p>
          <p className="text-sm">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience: Experience, index: number) => (
            <div
              key={index}
              className="border rounded p-4 border-gray-200 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">
                  Experience {index + 1}
                </h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={experience.company}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg"
                  placeholder="Company"
                />
                <input
                  type="text"
                  value={experience.position}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg"
                  placeholder="Position"
                />
                <input
                  type="month"
                  min="1980"
                  max={currentMonth}
                  value={experience.start_date}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  onKeyDown={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  className="px-3 py-2 text-sm rounded-lg"
                  placeholder="Start Date"
                />
                {!experience.is_current && (
                  <input
                    type="month"
                    min="2000-01"
                    max={currentMonth}
                    value={experience.end_date}
                    onChange={(e) =>
                      updateExperience(index, "end_date", e.target.value)
                    }
                    className="px-3 py-2 text-sm rounded-lg disabled:bg-gray-100"
                    onKeyDown={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                    placeholder="End Date"
                  />
                )}
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "is_current",
                      e.target.checked ? true : false,
                    )
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I currently work here
                </span>
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>
                  <button
                    onClick={() => handleAIEnhance(index)}
                    disabled={loading}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 disabled:opacity-50"
                  >
                    <Sparkles className="size-4" />
                    {loading ? "Enhancing..." : "AI Enhance"}
                  </button>
                </div>
                <textarea
                  className="w-full text-sm px-3 py-2 rounded-lg resize-none"
                  placeholder="Describe Your key responsibilities and achievements..."
                  value={experience.description || ""}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  rows={4}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
