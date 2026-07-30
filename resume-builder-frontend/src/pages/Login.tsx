import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { postJson } from "../services/api";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await postJson<{
        message?: string;
        token?: string;
        success?: boolean;
      }>("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (data.success) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        setMessage(data.message || "Success");
        navigate("/app");
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="w-full sm:w-96 text-center bg-white/3 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-10 shadow-2xl"
      >
        {/* Logo / Icon badge */}
        <div className="w-14 h-14 mx-auto rounded-2xl bg-linear-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-900/50">
          <LogIn className="size-6 text-white" />
        </div>

        <h1 className="text-white text-3xl mt-5 font-semibold ">
          Welcome back
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          Log in to continue to your account
        </p>

        <div className="flex items-center w-full mt-8 bg-white/5 ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-indigo-500 h-13 rounded-xl overflow-hidden pl-4 gap-3 transition-all">
          <Mail className="size-4 text-white/50 shrink-0" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="w-full h-full bg-transparent text-white placeholder-white/40 border-none outline-none text-sm"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center w-full mt-3 bg-white/5 ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-indigo-500 h-13 rounded-xl overflow-hidden pl-4 gap-3 transition-all">
          <Lock className="size-4 text-white/50 shrink-0" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full h-full bg-transparent text-white placeholder-white/40 border-none outline-none text-sm"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="pr-4 text-white/40 hover:text-white/70 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>

        <div className="mt-3 text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {message && (
          <p className="mt-4 text-sm text-indigo-200 bg-indigo-500/10 border border-indigo-500/20 rounded-lg py-2 px-3">
            {message}
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
              Please wait...
            </span>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </form>

      {/* Soft Backdrop*/}
      <div className="fixed inset-0 -z-1 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-linear-to-tr from-indigo-800/35 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-12 bottom-10 w-105 h-55 bg-linear-to-bl from-indigo-700/35 to-transparent rounded-full blur-2xl" />
      </div>
    </div>
  );
};

export default Login;
