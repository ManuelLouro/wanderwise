import { useEffect, useState } from "react";
import Hamburger from "../hamburger";

function NavBar() {
  const [user, setUser] = useState(null);

  // Fetch profile from backend
  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include", // Important to include session cookie
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not authenticated");
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/login";
  };

  const handleLogout = () => {
    window.location.href = "http://localhost:3000/logout";
  };

  return (
    <nav className="bg-gradient-to-r from-customTeal to-green-300 h-15 w-full flex items-center px-4 shadow-xl">
      <img src="../src/assets/wanderwiselogo.png" alt="Logo" className="h-16" />
      <h1 className="text-customBlue font-medium mt-1 text-xl ml-4">WanderWise</h1>

      <div className="ml-auto flex space-x-4">
        {!user ? (
          <>
            {/* Login & Register both go to /login */}
            <button
              onClick={handleLogin}
              className="w-19 h-8 rounded-xl py-1 px-2 bg-customTeal text-customBlue font-medium"
            >
              Register
            </button>

            <button
              onClick={handleLogin}
              className="w-19 h-8 rounded-xl py-1 px-2 bg-customTeal text-customBlue font-medium"
            >
              Login
            </button>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <img  alt="Profile" className="h-10 w-10 rounded-full" />
            <span className="text-customBlue font-medium"></span>
            <button
              onClick={handleLogout}
              className="w-19 h-8 rounded-xl py-1 px-2 bg-red-500 text-white font-medium"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export { NavBar };
