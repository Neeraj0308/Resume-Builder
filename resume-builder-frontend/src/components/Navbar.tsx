import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type User = {
  name?: string;
};

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getProfile();
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

  return (
    <div className="shadow bg-white">
      <div className="flex justify-between items-center px-5 py-3">
        <h2>Resume Builder</h2>

        <div className="flex gap-5 items-center">
          <p>Hi, {user?.name}</p>

          <button onClick={logoutUser}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
