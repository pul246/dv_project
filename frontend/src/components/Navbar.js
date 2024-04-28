import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div id="menu" className="bg-white/10 col-span-3 rounded-lg p-4 ">
        <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 to-transparent bg-clip-text text-transparent">
          Spotify Trends <span className="text-indigo-400">.</span>
        </h1>
        <p className="text-slate-400 text-sm mb-2 mt-2">Welcome back,</p>
        <a
          href="#"
          className="flex flex-col space-y-2 md:space-y-0 md:flex-row mb-5 items-center md:space-x-2 hover:bg-white/10 group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2"
        >
          <div>
            <img
              className="rounded-full w-10 h-10 relative object-cover"
              src="music1.png"
              alt=""
            />
          </div>
          <div>
            <p className="font-medium group-hover:text-indigo-400 leading-4">
              Saksham Singh
            </p>
            <span className="text-xs text-slate-400">India</span>
          </div>
        </a>
        <hr className="my-2 border-slate-700" />
        <div id="menu" className="flex flex-col space-y-2 my-5">
          <a
            href="#"
            className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
          >
            <Link to="/">
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 group-hover:text-indigo-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">
                    Dashboard
                  </p>
                  <p className="text-slate-400 text-sm hidden md:block">
                    Overview
                  </p>
                </div>
              </div>
            </Link>
          </a>

          <a
            href="#"
            className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
          >
            <Link to="/Albums">
              <div className="relative flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 group-hover:text-indigo-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">
                    Albums
                  </p>
                  <p className="text-slate-400 text-sm hidden md:block">
                    Explore Different Albumns
                  </p>
                </div>
                {/* <div className="absolute -top-3 -right-3 md:top-0 md:right-0 px-2 py-1.5 rounded-full bg-indigo-800 text-xs font-mono font-bold">
                23
              </div> */}
              </div>
            </Link>
          </a>
        </div>
        <p className="text-sm text-center text-gray-600">
          v1.0 | &copy; 2023 Saksham & Ajay
        </p>
      </div>
    </>
  );
};

export default Navbar;
