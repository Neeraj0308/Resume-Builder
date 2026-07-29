import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Lock, CheckCircle2, XCircle } from "lucide-react";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/auth/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setToast({ type: "success", message: "Password updated successfully" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/app");
      }, 1200);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setToast({
        type: "error",
        message: err?.response?.data?.message || "Could not update password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full sm:w-96 text-center bg-white/3 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-10 shadow-2xl"
      >
        {/* Logo / Icon badge */}
        <div className="w-14 h-14 mx-auto rounded-2xl bg-linear-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-900/50">
          <Lock className="size-6 text-white" />
        </div>

        <h1 className="text-white text-3xl mt-5 font-semibold tracking-tight">
          Change Password
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          Enter your current and new password
        </p>

        <div className="flex items-center w-full mt-8 bg-white/5 ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-indigo-500 h-13 rounded-xl overflow-hidden pl-4 gap-3 transition-all">
          <Lock className="size-4 text-white/50 shrink-0" />
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full h-full bg-transparent text-white placeholder-white/40 border-none outline-none text-sm"
            required
          />
        </div>

        <div className="flex items-center w-full mt-3 bg-white/5 ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-indigo-500 h-13 rounded-xl overflow-hidden pl-4 gap-3 transition-all">
          <Lock className="size-4 text-white/50 shrink-0" />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full h-full bg-transparent text-white placeholder-white/40 border-none outline-none text-sm"
            required
          />
        </div>

        <div className="flex items-center w-full mt-3 bg-white/5 ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-indigo-500 h-13 rounded-xl overflow-hidden pl-4 gap-3 transition-all">
          <Lock className="size-4 text-white/50 shrink-0" />
          <input
            type="password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-full bg-transparent text-white placeholder-white/40 border-none outline-none text-sm"
            required
          />
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full h-12 rounded-xl text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-indigo-900/30"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Updating...
            </span>
          ) : (
            "Update Password"
          )}
        </button>

        <button
          type="button"
          onClick={() => navigate("/app")}
          className="text-gray-400 text-sm mt-6 hover:text-gray-300 transition-colors"
        >
          Cancel and go back
        </button>
      </form>

      {toast && (
        <div className="fixed top-6 right-6 z-50">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border min-w-70 max-w-sm backdrop-blur-xl ${
              toast.type === "success"
                ? "bg-green-500/10 border-green-500/20 text-green-300"
                : "bg-red-500/10 border-red-500/20 text-red-300"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="size-5 shrink-0 text-green-400" />
            ) : (
              <XCircle className="size-5 shrink-0 text-red-400" />
            )}
            <p className="text-sm font-medium flex-1">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Soft Backdrop*/}
      <div className="fixed inset-0 -z-1 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-linear-to-tr from-indigo-800/35 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-12 bottom-10 w-105 h-55 bg-linear-to-bl from-indigo-700/35 to-transparent rounded-full blur-2xl" />
      </div>
    </div>
  );
};

export default ChangePassword;
