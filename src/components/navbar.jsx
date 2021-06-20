import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth";

function Navbar() {
  const { currentStatus } = useContext(AuthContext);

  return (
    <header className="mx-auto max-w-6xl px-6 bg-transparent">
      <div className="relative md:flex flex-row justify-between py-4 align-center md:py-6">
        <div className="flex items-center flex-1">
          <p className="text-3xl font-bold text-gray-100 md:text-2xl hidden md:inline">
            Complaintinator
          </p>
        </div>
        <nav className="flex justify-evenly">
          <Link
            to="/auth/register"
            className="mr-5 text-yellow-500 p-3 rounded hover:text-blue-400 hover:bg-white transition duration-500 ease-in-out"
          >
            Register
          </Link>
          <Link
            className="mr-5 text-yellow-500 p-3 rounded hover:text-blue-400 hover:bg-white transition duration-500 ease-in-out"
            to="/auth/login"
          >
            Login
          </Link>
          <Link
            className="mr-5 text-yellow-500 p-3 rounded hover:text-blue-400 hover:bg-white transition duration-500 ease-in-out"
            to="/admin"
          >
            Admin
          </Link>
          {currentStatus && (
            <Link
              className="mr-5 text-yellow-500 p-3 rounded hover:text-blue-400 hover:bg-white transition duration-500 ease-in-out"
              to="/dashboard"
            >
              Dashboard
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
