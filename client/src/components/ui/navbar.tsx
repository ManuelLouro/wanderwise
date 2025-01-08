import Hamburger from "../hamburger";


function NavBar() {
  return (
    <>
      <nav className="bg-gradient-to-r from-customTeal to-green-300 h-15 w-[100%] flex items-center  px-4 shadow-xl">
        <img
          src="../src/assets/wanderwiselogo.png"
          alt="Logo"
          className="h-16"
        />
        <div className="flex space-x-4">
          <h1 className="text-customBlue font-medium mt-1 text-xl">
            WanderWise
          </h1>
        </div>
        <button className="flex ml-10 w-19 h-8 rounded-xl py-1 px-2 bg-customTeal text-customBlue font-medium">
          Register
        </button>
        <button className="flex ml-5 w-19 h-8 rounded-xl py-1 px-2 bg-customTeal text-customBlue font-medium">
          Login
        </button>
      </nav>
    </>
  );
}

export { NavBar };
