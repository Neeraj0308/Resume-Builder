import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, XCircle } from "lucide-react";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string })?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Redirect back if someone lands here directly without an email
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  // Cooldown timer for resend button
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp.trim()) {
      setToast({ type: "error", message: "Please enter the OTP" });
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/otp/verify-otp", {
        email,
        otp: otp.trim(),
      });

      setToast({ type: "success", message: "OTP verified" });

      // Small delay so the user sees the success toast before navigating
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 800);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setToast({
        type: "error",
        message: err?.response?.data?.message || "Invalid or expired OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;

    setResending(true);
    try {
      await axios.post(
        "http://localhost:5000/api/auth/forgot-password/resend-otp",
        {
          email,
        },
      );
      setToast({ type: "success", message: "OTP resent to your email" });
      setCooldown(30);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setToast({
        type: "error",
        message: err?.response?.data?.message || "Could not resend OTP",
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md bg-white/3 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-1 ">
          Verify OTP
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Enter the OTP sent to{" "}
          <span className="font-medium text-gray-300">{email}</span>
        </p>

        <form noValidate onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="w-full text-center tracking-[0.5em] text-lg font-semibold px-3 py-2.5 bg-white/5 text-white placeholder-white/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-4 text-center">
          {cooldown > 0 ? (
            <p className="text-sm text-gray-500">Resend OTP in {cooldown}s</p>
          ) : (
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300 disabled:opacity-50 transition-colors"
            >
              {resending ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>
      </div>

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
    </div>
  );
};

export default VerifyOtp;
