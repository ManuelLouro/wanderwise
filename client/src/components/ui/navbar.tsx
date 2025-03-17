import { useAuth0 } from "@auth0/auth0-react";
import Hamburger from "../hamburger";

function NavBar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <nav className="bg-gradient-to-r from-customTeal to-green-300 h-15 w-full flex items-center px-4 shadow-xl">
      <img src="../src/assets/wanderwiselogo.png" alt="Logo" className="h-16" />
      <h1 className="text-customBlue font-medium mt-1 text-xl ml-4">
        WanderWise
      </h1>
      
      <div className="ml-auto flex space-x-4">
        {!isAuthenticated ? (
          <>
            {/* Redirects to sign-up page */}
            <button
              onClick={() =>
                loginWithRedirect({
                  authorizationParams: {
                    screen_hint: "signup",
                    redirect_uri: "http://localhost:5173/callback", // Ensure matches Auth0
                  },
                })
              }
              className="w-19 h-8 rounded-xl py-1 px-2 bg-customTeal text-customBlue font-medium"
            >
              Register
            </button>

            {/* Standard login */}
            <button
              onClick={() =>
                loginWithRedirect({
                  authorizationParams: { redirect_uri: "http://localhost:5173/callback" },
                })
              }
              className="w-19 h-8 rounded-xl py-1 px-2 bg-customTeal text-customBlue font-medium"
            >
              Login
            </button>
          </>
        ) : (
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: "http://localhost:5173" } })
            }
            className="w-19 h-8 rounded-xl py-1 px-2 bg-red-500 text-white font-medium"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export { NavBar };
