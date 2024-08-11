import React, { Profiler, useEffect, useRef, useState } from "react";
import {
  PaperAirplaneIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { logo } from "../assets";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import { axiosClient1 } from "../axiosClient";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const { user, token, setUser, setToken } = useStateContext();
  const [toggleMenu, setToggleMenu] = useState(false);

  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient1.get("/logout").then(({}) => {
      setUser(null);
      setToken(null);
    });
  };

  useEffect(() => {
    if (token) {
      axiosClient1.get("/users").then(({ data }) => {
        setUser(data.data.users[0]);
      });
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav>
      <div className="max-w-7xl mx-auto">
        <div className="flex mx-auto justify-between w-5/6 ">
          <div className="flex items-center gap-16 my-12">
            <div>
              <a
                href="/"
                className="flex gap-1 font-bold text-gray-700 items-center "
              >
                <img src={logo} alt="logo" className="h-6 w-6" />
                <span>Aksamedia</span>
              </a>
            </div>
            {token && (
              <div className="hidden lg:flex gap-8 ">
                <a href="#">Task 1</a>
                <NavLink
                  to="/task2"
                  className={({ isActive }) =>
                    isActive ? "text-gray-700" : ""
                  }
                >
                  Task 2
                </NavLink>
                <NavLink
                  to="/task3"
                  className={({ isActive }) =>
                    isActive ? "text-gray-700" : ""
                  }
                >
                  Task 3
                </NavLink>
                <NavLink
                  to="/task4"
                  className={({ isActive }) =>
                    isActive ? "text-gray-700" : ""
                  }
                >
                  Task 4
                </NavLink>
              </div>
            )}
          </div>
          <div className="flex gap-6">
            <div className="hidden xs:flex items-center gap-10">
              <div className="hidden lg:flex items-center gap-2">
                <MoonIcon className="h-6 w-6" />
                <SunIcon className="h-6 w-6" />
              </div>
              <div ref={dropdownRef}>
                {token ? (
                  <div className="relative">
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={handleDropdownToggle}
                    >
                      <span>{user.name}</span>
                      <ChevronDownIcon className="h-6 w-6" />
                    </div>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform">
                        <ul>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <Link to={`/user/${user.id}`}>Edit Profile</Link>
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <a href="#" onClick={onLogout}>
                              Logout
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <button className="rounded-full border-solid border-2 border-gray-300 py-2 px-4 hover:bg-gray-700 hover:text-gray-100">
                    Login
                  </button>
                )}
              </div>
            </div>
            {/* Mobile navigation toggle */}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setToggleMenu(!toggleMenu)}>
                <Bars3Icon className="h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* mobile navigation */}
      <div
        className={`fixed z-40 w-full  bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 ${
          !toggleMenu ? "h-0" : "h-full"
        }`}
      >
        <div className="px-8">
          <div className="flex flex-col gap-8 font-bold tracking-wider">
            {token && (
              <div className="flex flex-col gap-8 font-bold tracking-wider">
                <a href="#">Task 1</a>
                <NavLink
                  to="/task2"
                  className={({ isActive }) =>
                    isActive ? "text-gray-700" : ""
                  }
                >
                  Task 2
                </NavLink>
                <NavLink
                  to="/task3"
                  className={({ isActive }) =>
                    isActive ? "text-gray-700" : ""
                  }
                >
                  Task 3
                </NavLink>
                <NavLink
                  to="/task4"
                  className={({ isActive }) =>
                    isActive ? "text-gray-700" : ""
                  }
                >
                  Task 4
                </NavLink>
              </div>
            )}
            {/* logout */}
            <div className="flex items-center gap-2">
              <MoonIcon className="h-6 w-6" />
              <SunIcon className="h-6 w-6" />
              <div ref={dropdownRef}>
                {token ? (
                  <div className="relative">
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={handleDropdownToggle}
                    >
                      <span>{user.name}</span>
                      <ChevronDownIcon className="h-6 w-6" />
                    </div>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform">
                        <ul>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <Link to={`/user/${user.id}`}>Edit Profile</Link>
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <a href="#" onClick={onLogout}>
                              Logout
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <button className="rounded-full border-solid border-2 border-gray-300 py-2 px-4 hover:bg-gray-700 hover:text-gray-100">
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
