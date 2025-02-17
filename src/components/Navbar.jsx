import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="sticky top-0 z-50 ">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#01274e] rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/allreviews">All Reviews</Link>
              </li>
              <li>
                <Link to="/addreview">Add Review</Link>
              </li>
              <li>
                <Link to="/myreviews">My Reviews</Link>
              </li>
              <li>
                <Link to="/gamewatchlist">Game WatchList</Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="md:text-3xl font-extrabold">
            <img
              className="w-[80px] h-[50px] rounded-lg"
              src="https://i.ibb.co.com/518mdNF/logo.png"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-xl px-1 space-x-2">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/allreviews">All Reviews</Link>
            </li>
            <li>
              <Link to="/addreview">Add Review</Link>
            </li>
            <li>
              <Link to="/myreviews">My Reviews</Link>
            </li>
            <li>
              <Link to="/gamewatchlist">Game WatchList</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end gap-2 flex items-center">
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle text-xl"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          {user ? (
            <div className="flex items-center gap-4">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={user.photoURL || "https://via.placeholder.com/150"}
                      alt="User"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-[#01274e] text-white rounded-box shadow mt-3 w-40"
                >
                  <li>
                    <span className="text-center mb-2 bg-[#e9e2e222]">
                      {user.displayName}
                    </span>
                  </li>

                  <li>
                    <button onClick={handleLogout} className="bg-[#e9e2e222]">
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="btn btn-primary rounded-md px-8 text-xl"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
