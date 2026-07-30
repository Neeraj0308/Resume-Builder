/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { enhanceText } from "../services/aiService";

const ProfessionalSummaryForm = ({ data, onChange }: any) => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Auto-dismiss toast after 3 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleAIEnhance = async () => {
    if (!data?.trim()) {
      setToast({
        type: "error",
        message: "Please enter a summary first",
      });
      return;
    }

    try {
      setLoading(true);

      const enhanced = await enhanceText("Professional Summary", data);

      onChange(enhanced);
      setToast({ type: "success", message: "Summary enhanced successfully" });
    } catch (error) {
      console.error(error);
      setToast({ type: "error", message: "AI Enhancement Failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 relative">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
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
          required
        />
        <p className="text-sm text-gray-500 max-w-4/5 x-auto text-center">
          Tip: Keep it concise and highlight your key strengths.
        </p>
      </div>

      {toast && (
        <div className="fixed top-6 right-6 z-50">
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

export default ProfessionalSummaryForm;