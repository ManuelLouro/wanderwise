import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hooks
import Hamburger from "../hamburger";

function NavBar() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();  // Use Auth0 hooks
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);

  // Check if the user is authenticated
  useEffect(() => {
    setIsUserAuthenticated(isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = () => {
    loginWithRedirect();  // No need to pass redirect_uri here
  };

  const handleLogout = () => {
    logout(); // Simply logout without returnTo
    window.location.href = window.location.origin; // Manually redirect to the home page after logout
  };

  return (
    <nav className="bg-gradient-to-r from-customTeal to-green-300 h-15 w-full flex items-center px-4 shadow-xl">
      <img src="../src/assets/wanderwiselogo.png" alt="Logo" className="h-16" />
      <h1 className="text-customBlue font-medium mt-1 text-xl ml-4">WanderWise</h1>

      <div className="ml-auto flex space-x-4">
        {!isUserAuthenticated ? (
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
            <img alt="Profile" className="h-10 w-10 rounded-full" />
            <span className="text-customBlue font-medium">{user?.name}</span>
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
