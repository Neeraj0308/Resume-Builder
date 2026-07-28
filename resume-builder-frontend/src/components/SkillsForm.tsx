import { useState } from "react";
import { Plus, Sparkles, X, Pencil } from "lucide-react";

const SkillsForm = ({
  data,
  onChange,
}: {
  data: string[];
  onChange: (data: string[]) => void;
}) => {
  const [newSkill, setNewSkill] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addSkill = () => {
    // If we're editing an existing skill, update it instead of adding new ones
    if (editingIndex !== null) {
      const trimmed = newSkill.trim();

      if (trimmed === "") {
        setEditingIndex(null);
        setNewSkill("");
        return;
      }

      // Check if the edited value clashes with another existing skill (not itself)
      const isDuplicate = data.some(
        (existing, i) =>
          i !== editingIndex &&
          existing.toLowerCase() === trimmed.toLowerCase(),
      );

      if (!isDuplicate) {
        const updated = [...data];
        updated[editingIndex] = trimmed;
        onChange(updated);
      }

      setEditingIndex(null);
      setNewSkill("");
      return;
    }

    // Normal add flow (supports comma-separated multiple skills)
    const skills = newSkill
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");

    const uniqueSkills = skills.filter(
      (skill) =>
        !data.some(
          (existing) => existing.toLowerCase() === skill.toLowerCase(),
        ),
    );

    if (uniqueSkills.length > 0) {
      onChange([...data, ...uniqueSkills]);
    }

    setNewSkill("");
  };

  const removeSkill = (index: number) => {
    onChange(data.filter((_, itemIndex) => itemIndex !== index));

    // If the skill being removed is the one currently being edited, reset the form
    if (editingIndex === index) {
      setEditingIndex(null);
      setNewSkill("");
    }
  };

  const startEditSkill = (index: number) => {
    setEditingIndex(index);
    setNewSkill(data[index]);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setNewSkill("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // While editing, only Enter should submit — comma/space would break a single skill name
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
      return;
    }

    if (editingIndex === null && (e.key === "," || e.key === " ")) {
      e.preventDefault();
      addSkill();
    }

    if (e.key === "Escape" && editingIndex !== null) {
      cancelEdit();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          Skills
        </h3>
        <p className="text-sm text-gray-500">Add Your Skills</p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder={editingIndex !== null ? "Edit skill" : "Enter a skill"}
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyPress}
          className={`flex-1 px-3 py-2 text-sm rounded-lg border ${
            editingIndex !== null
              ? "border-blue-400 ring-1 ring-blue-200"
              : "border-gray-300"
          }`}
        />
        <button
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {editingIndex !== null ? (
            <>
              <Pencil className="size-4" />
              Update
            </>
          ) : (
            <>
              <Plus className="size-4" />
              Add
            </>
          )}
        </button>
        {editingIndex !== null && (
          <button
            onClick={cancelEdit}
            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((skill: string, index: number) => (
            <span
              key={index}
              onClick={() => startEditSkill(index)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                editingIndex === index
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
              }`}
            >
              {skill}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSkill(index);
                }}
                className={`ml-1 rounded-full p-0.5 transition-colors ${
                  editingIndex === index
                    ? "hover:bg-blue-700"
                    : "hover:bg-blue-200"
                }`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <Sparkles className="w-10 h-10 mx-auto mb-2 text-gray-300" />
          <p>No Skills added yet</p>
          <p className="text-sm">Add Your technical above. </p>
        </div>
      )}

      <div>
        <p className="text-sm text-gray-500">Add 5-10 skills</p>
      </div>
    </div>
  );
};

export default SkillsForm;