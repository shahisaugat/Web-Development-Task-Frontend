import React from "react";
import { Link } from "react-router-dom";
// import Home from "../assets/homeIcon.png";
// import Logo from '../assets/logo-black.png';
import { RiDashboardFill } from "react-icons/ri";
import { MdPeopleAlt, MdAnalytics } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { GiStrong } from "react-icons/gi";
import { FaCalendarDays } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { GiGrass } from "react-icons/gi";


function Sidebar() {
  return (
    <div className="h-screen bg-slate-200 dark:bg-white">
      <div className="flex flex-col gap-3 w-full text-slate-300 h-full justify-between">
        <div className="flex flex-col gap-10 px-4 mt-4">
          <div className="flex items-center justify-center gap-3">
            <div className="block md:hidden">
            </div>
            <div className="hidden md:block w-32 h-auto ">
            </div>
          </div>
          <div className="flex flex-col  gap-10 text-md sm:text-sm lg:text-lg ">
            <Link to="/" className="flex items-center gap-3">
              <RiDashboardFill className="text-2xl text-black"/>
              <span className="hidden sm:flex text-slate-600 hover:text-slate-400 cursor-pointer font-Roboto">
                Dashboard
              </span>
            </Link>
            <Link to="/book" className="flex items-center gap-3">
              <FaBookmark className="text-2xl text-black" />
              <span className="hidden font-Roboto sm:flex text-slate-600 hover:text-slate-400 cursor-pointer">
                Book
              </span>
            </Link>
            <Link to="/ground" className="flex items-center gap-3">
              <GiGrass className="text-2xl text-black"/>
              <span className="hidden sm:flex text-slate-600 hover:text-slate-400 cursor-pointer">
                Ground
              </span>
            </Link>
            <Link to="/user" className="flex items-center gap-3">
              <MdPeopleAlt className="text-2xl text-black"/>
              <span className="hidden font-Roboto sm:flex text-slate-600 hover:text-slate-400 cursor-pointer">
                User
              </span>
            </Link>
            
          </div>
        </div>

        <div className="flex items-center text-md text-slate-600 hover:text-slate-400 sm:text-xs md:text-sm lg:text-lg px-4 mb-4 gap-3">
          <IoLogOut className="text-md text-black"/>
          <span className="hidden font-Roboto sm:flex">Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
