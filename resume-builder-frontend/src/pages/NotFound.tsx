import { Link } from "react-router-dom";
import { Home, ArrowLeft, SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <div className="w-full sm:w-96 text-center bg-white/3 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-10 shadow-2xl">
        {/* Icon badge */}
        <div className="w-14 h-14 mx-auto rounded-2xl bg-linear-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-900/50">
          <SearchX className="size-6 text-white" />
        </div>

        <h1 className="text-white text-7xl mt-6 font-bold  bg-linear-to-br from-white to-white/50 bg-clip-text">
          404
        </h1>

        <h2 className="text-white text-xl mt-2 font-semibold ">
          Page not found
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Link
            to="/"
            className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-indigo-900/30"
          >
            <Home className="size-4" />
            Go home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl text-white/80 font-medium bg-white/5 border border-white/10 hover:bg-white/10 active:scale-[0.98] transition-all duration-150"
          >
            <ArrowLeft className="size-4" />
            Go back
          </button>
        </div>
      </div>

      {/* Soft Backdrop */}
      <div className="fixed inset-0 -z-1 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-linear-to-tr from-indigo-800/35 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-12 bottom-10 w-105 h-55 bg-linear-to-bl from-indigo-700/35 to-transparent rounded-full blur-2xl" />
      </div>
    </div>
  );
};

export default NotFound;