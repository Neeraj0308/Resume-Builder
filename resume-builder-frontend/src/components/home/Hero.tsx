import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <section className="flex flex-col items-center">
        <nav className="flex flex-col items-center w-full">
          <div className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-4 w-full">
            <div
              id="menu"
              className={`${mobileOpen ? "max-md:w-full" : "max-md:w-0"} max-md:fixed max-md:top-0 max-md:z-10 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-screen max-md:bg-white/25 max-md:backdrop-blur max-md:flex-col max-md:justify-center flex items-center gap-8 text-sm`}
            >
              <a
                href="/"
                onClick={() => setMobileOpen(false)}
                className="text-[#050040] hover:text-[#050040]/70"
              >
                Home
              </a>
              <a
                href="#feature"
                onClick={() => setMobileOpen(false)}
                className="text-[#050040] hover:text-[#050040]/70"
              >
                Features
              </a>
              <a
                href="#testimonial"
                onClick={() => setMobileOpen(false)}
                className="text-[#050040] hover:text-[#050040]/70"
              >
                Testimonial
              </a>
              <a
                href="#About"
                onClick={() => setMobileOpen(false)}
                className="text-[#050040] hover:text-[#050040]/70"
              >
                About
              </a>

              <button
                id="close-menu"
                onClick={() => setMobileOpen(false)}
                className="md:hidden bg-zinc-900 hover:bg-zinc-800 text-white p-2 rounded-md aspect-square font-medium transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="active:scale-95 hover:bg-indigo-50/50 transition px-4 py-2 border border-indigo-600 rounded-md text-slate-800 cursor-pointer"
              >
                Sign in
              </button>
              <button
                onClick={() => navigate("/login")}
                className="text-white px-4 py-2 bg-indigo-600 active:scale-95 hover:bg-indigo-700 transition rounded-md cursor-pointer"
              >
                Get started
              </button>
            </div>
            <button
              id="open-menu"
              onClick={() => setMobileOpen(true)}
              className="md:hidden bg-zinc-900 hover:bg-zinc-800 text-white p-2 rounded-md aspect-square font-medium transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path d="M4 12h16" /> <path d="M4 18h16" />{" "}
                <path d="M4 6h16" />{" "}
              </svg>
            </button>
          </div>
          <div className="w-full border-b border-slate-200"></div>
        </nav>

        <div className="flex py-20">
          <p className="flex items-center gap-2 text-indigo-600">
            <path
              d="m1 1 4 3.5L1 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </p>
        </div>

        <h1 className="text-center text-slate-800 text-4xl md:text-5xl/16 font-semibold max-w-3xl leading-tight bg-clip-text my-2.5 px-4">
          Resume{" "}
          <span className="bg-linear-to-r from-indigo-600 to-pink-400 bg-clip-text text-transparent">
            Builder
          </span>{" "}
          to boost your Hiring Chances
        </h1>
        <p className="text-center text-base text-gray-600 max-w-md px-4">
          Workflows that never miss. automation that helps your team do more,
          effortlessly.
        </p>

        <div className="flex gap-4 py-10">
          <Link
            to="/app?state=register"
            className="md:block px-6 py-2 bg-green-500 hover:bg-indigo-700 active:scale-95 transition-all rounded-full text-white"
          >
            Get Started
          </Link>
          <Link
            to="app?state=login"
            className="md:block px-6 py-2 border hover:bg-indigo-500 transition-all rounded-full textslate-700 hover:text-slate-900"
          >
            Login
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Hero;
