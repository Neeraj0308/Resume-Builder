/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { enhanceText } from "../services/aiService";

const ProfessionalSummaryForm = ({ data, onChange }: any) => {
  const [loading, setLoading] = useState(false);

  const handleAIEnhance = async () => {
    // console.log("===== BUTTON CLICKED =====");
    // console.log("Data:", data);
    // console.log("Professional Summary:", data?.professionalSummary);

    // alert(JSON.stringify(data));

    try {
      setLoading(true);

      const enhanced = await enhanceText("Professional Summary", data);

      onChange(enhanced);
    } catch (error) {
      console.error(error);
      alert("AI Enhancement Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 tet-lg font-semibold tet-gray-900">
            {" "}
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add summary for your resume here
          </p>
        </div>
        <button
          onClick={handleAIEnhance}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 disabled:opacity-50"
        >
          <Sparkles className="size-4" />
          {loading ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <div className="mt-6">
        <textarea
          rows={7}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your professional summary..."
          value={data}
          onChange={(e) => onChange(e.target.value)}
        />
        <p className="text-sm text-gray-500 max-w-4/5 x-auto text-center">
          Tip: Keep it concise and highlight your key strengths.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
