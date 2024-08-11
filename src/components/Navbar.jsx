import React, { useState } from "react";
import {
  PaperAirplaneIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { logo } from "../assets";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

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
            <div className="hidden lg:flex gap-8 ">
              <a href="#">Tugas 1</a>
              <a href="#">Tugas 2</a>
              <a href="#">Tugas 3</a>
              <a href="#">Tugas 4</a>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="hidden xs:flex items-center gap-10">
              <div className="hidden lg:flex items-center gap-2">
                <MoonIcon className="h-6 w-6" />
                <SunIcon className="h-6 w-6" />
              </div>
              <div>
                <button className="rounded-full border-solid border-2 border-gray-300 py-2 px-4 hover:bg-gray-700 hover:text-gray-100">
                  Login
                </button>
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
            <a href="#" className="border-l-4 border-gray-600">
              Features
            </a>
            <a href="#">Pricing</a>
            <a href="#">Download</a>
            <a href="#">Classic</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
