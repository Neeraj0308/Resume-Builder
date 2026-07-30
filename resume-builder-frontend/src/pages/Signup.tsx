import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, User, Eye, EyeOff, UserPlus } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
       await axios.post("http://localhost:5000/api/auth/signup", {
         name: name.trim(),
         email: email.trim(),
          password,
         });
    

        navigate("/verifyEmail", {
        state: { email },
        });

      // if (res.data?.token) {
      //   localStorage.setItem("token", res.data.token);
      //   navigate("/app");
      // } else {
      //   navigate("/login");
      // }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.message || "Signup failed. Try again.");
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
          <UserPlus className="size-6 text-white" />
        </div>

        <h1 className="text-white text-3xl mt-5 font-semibold tracking-tight">
          Create account
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          Sign up to start building your resume
        </p>

        <div className="flex items-center w-full mt-8 bg-white/5 ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-indigo-500 h-13 rounded-xl overflow-hidden pl-4 gap-3 transition-all">
          <User className="size-4 text-white/50 shrink-0" />
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-full bg-transparent text-white placeholder-white/40 border-none outline-none text-sm"
            required
          />
        </div>

        <div className="flex items-center w-full mt-3 bg-white/5 ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-indigo-500 h-13 rounded-xl overflow-hidden pl-4 gap-3 transition-all">
          <Mail className="size-4 text-white/50 shrink-0" />
          <input
            type="email"
            placeholder="Email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-full bg-transparent text-white placeholder-white/40 border-none outline-none text-sm"
            required
          />
        </div>

        <div className="flex items-center w-full mt-3 bg-white/5 ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-indigo-500 h-13 rounded-xl overflow-hidden pl-4 gap-3 transition-all">
          <Lock className="size-4 text-white/50 shrink-0" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-full bg-transparent text-white placeholder-white/40 border-none outline-none text-sm"
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
              Creating account...
            </span>
          ) : (
            "Sign Up"
          )}
        </button>

        <p className="text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            Log in
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

export default Signup;