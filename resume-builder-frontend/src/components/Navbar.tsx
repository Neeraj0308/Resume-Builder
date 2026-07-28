import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User as UserIcon, KeyRound, LogOut } from "lucide-react";

type User = {
  name?: string;
};

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    getProfile();
  }, []);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const goToChangePassword = () => {
    setShowDropdown(false);
    navigate("/reset-password");
  };

  // Get first letter of name for avatar
  const initial = user?.name?.charAt(0).toUpperCase() || "?";

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">
          <Link
            to={"/app"}
            className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
          >
            Resume Builder
          </Link>
        </h2>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold hover:ring-2 hover:ring-indigo-300 transition-all">
              {initial}
            </div>
            <p className="text-gray-700 text-sm font-medium hidden sm:block">
              Hi, {user?.name || "Guest"}
            </p>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2">
                <UserIcon size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700 font-medium truncate">
                  {user?.name || "Guest"}
                </span>
              </div>

              <button
                onClick={goToChangePassword}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <KeyRound size={16} className="text-gray-500" />
                Change Password
              </button>

              <button
                onClick={logoutUser}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;