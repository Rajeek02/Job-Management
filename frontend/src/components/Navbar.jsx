import React from "react";
import logo from "../assets/logo.png";

const Navbar = ({ onCreateClick }) => {
  return (
    <nav className="w-[790px] h-[60px] px-6 rounded-full shadow-[0px_0px_20px_rgba(0,0,0,0.05)] bg-white mx-auto mt-1 flex items-center justify-between font-sans">
      {/* Left Section */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />

        {/* Navigation Links */}
        <ul className="flex gap-8 text-sm font-medium text-black">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Find Jobs</li>
          <li className="cursor-pointer">Find Talents</li>
          <li className="cursor-pointer">About us</li>
          <li className="cursor-pointer">Testimonials</li>
        </ul>
      </div>

      {/* Right Section - Create Jobs Button */}
      <button
        onClick={onCreateClick}
        className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md hover:opacity-90 transition font-sans"
      >
        Create Jobs
      </button>
    </nav>
  );
};

export default Navbar;
