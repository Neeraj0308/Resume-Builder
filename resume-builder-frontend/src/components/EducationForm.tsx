import { GraduationCap, Plus, Trash2 } from "lucide-react";
import { useRef } from "react";

type Education = {
  institution: string;
  degree: string;
  field?: string;
  graduation_StartDate: string;
  graduation_EndDate?: string;
  gpa?: string;
};

const EducationForm = ({
  data,
  onChange,
}: {
  data: Education[];
  onChange: (d: Education[]) => void;
}) => {
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_StartDate: "",
      graduation_EndDate: "",
      gpa: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (
    index: number,
    field: string,
    value: string | boolean,
  ) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const monthInputRef = useRef<HTMLInputElement>(null);
  const monthInputReff = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Education
          </h3>
          <p className="text-sm text-gray-500">Add Your Education Details</p>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
        >
          <Plus className="size-4" />
          Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="size-12 mx-auto text-gray-300" />
          <p>No education added yet</p>
          <p className="text-sm">Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education: Education, index: number) => (
            <div
              key={index}
              className="border rounded p-4 border-gray-200 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">
                  Education #{index + 1}
                </h4>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">
                    Institution <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={education.institution || ""}
                    onChange={(e) =>
                      updateEducation(index, "institution", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Institution"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">
                    Degree <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={education.degree || ""}
                    onChange={(e) =>
                      updateEducation(index, "degree", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Degree"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">
                    Field / Course
                  </label>
                  <input
                    type="text"
                    value={education.field || ""}
                    onChange={(e) =>
                      updateEducation(index, "field", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Course"
                  />
                </div>

                <div />

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={monthInputRef}
                    type="month"
                    value={education.graduation_StartDate || ""}
                    onChange={(e) =>
                      updateEducation(
                        index,
                        "graduation_StartDate",
                        e.target.value,
                      )
                    }
                    onFocus={() => monthInputRef.current?.showPicker()}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">
                    End Date
                  </label>
                  <input
                    ref={monthInputReff}
                    type="month"
                    value={education.graduation_EndDate || ""}
                    onChange={(e) =>
                      updateEducation(
                        index,
                        "graduation_EndDate",
                        e.target.value,
                      )
                    }
                    onFocus={() => monthInputReff.current?.showPicker()}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600">
                  GPA (optional)
                </label>
                <input
                  type="text"
                  value={education.gpa || ""}
                  onChange={(e) =>
                    updateEducation(index, "gpa", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="GPA (optional)"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;