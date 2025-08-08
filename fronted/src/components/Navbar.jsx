import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-500">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Website Logo"
      />

      {/* Desktop menu */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <li className="py-1">
          <NavLink
            to="/"
            activeClassName="text-[#5f6FFF]" // For React Router v5
            className={({ isActive }) => (isActive ? "text-[#5f6FFF]" : "")} // For v6
          >
            HOME
          </NavLink>
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </li>

        <li className="py-1">
          <NavLink
            to="/doctors"
            activeClassName="text-[#5f6FFF]"
            className={({ isActive }) => (isActive ? "text-[#5f6FFF]" : "")}
          >
            ALL DOCTORS
          </NavLink>
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </li>

        <li className="py-1">
          <NavLink
            to="/about"
            activeClassName="text-[#5f6FFF]"
            className={({ isActive }) => (isActive ? "text-[#5f6FFF]" : "")}
          >
            ABOUT
          </NavLink>
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </li>

        <li className="py-1">
          <NavLink
            to="/contact"
            activeClassName="text-[#5f6FFF]"
            className={({ isActive }) => (isActive ? "text-[#5f6FFF]" : "")}
          >
            CONTACT
          </NavLink>
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </li>
      </ul>

      <div className="flex items-center gap-3">
        {token && userData ? (
          <div
            className="flex items-center gap-2 cursor-pointer group relative"
            onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            <img
              className="w-11 rounded-full"
              src={userData.image}
              alt="User Profile"
            />
            <img
              className="w-3"
              src={assets.dropdown_icon}
              alt="Dropdown Icon"
            />

            {dropdownVisible && (
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 ">
                <div className="min-w-48 bg-stone-300 rounded flex flex-col gap-4 p-4">
                  <p
                    onClick={() => navigate("my-profile")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("my-appointments")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={logout}
                    className="hover:text-black cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block transform duration-200 hover:scale-95 cursor-pointer"
          >
            Create Account
          </button>
        )}

        {/* Mobile menu icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="Open Menu"
          tabIndex={0}
          aria-label="Open mobile menu"
        />

        {/* Mobile menu */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img src={assets.logo} alt="Website Logo" className="w-36" />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="Close Menu"
              tabIndex={0}
              aria-label="Close mobile menu"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <li>
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/"
                className="px-4 py-2 rounded inline-block"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/doctors"
                className="px-4 py-2 rounded inline-block"
              >
                All Doctors
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/about"
                className="px-4 py-2 rounded inline-block"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/contact"
                className="px-4 py-2 rounded inline-block"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
