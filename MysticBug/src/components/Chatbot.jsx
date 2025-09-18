import React from "react";
import { FaLeaf } from "react-icons/fa";
import { images } from "../assets/assets";

const Chatbot = () => {
  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 pb-20 sm:pb-28 relative">
      <div className="bg-gradient-to-r from-blue-100 to-white rounded-xl sm:rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">

        {/* Left Section */}
        <div className="flex-1">
          <div className="flex gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-gray-700 mb-3 flex-wrap">
            <span className="flex items-center gap-1">
              Health <FaLeaf className="text-green-600" size={12} />
            </span>
            <span className="flex items-center gap-1">
              Care <FaLeaf className="text-green-600" size={12} />
            </span>
            <span className="flex items-center gap-1">
              Peace <FaLeaf className="text-green-600" size={12} />
            </span>
            <span className="flex items-center gap-1">
              Simplicity <FaLeaf className="text-green-600" size={12} />
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-black mb-4 leading-tight">
            Effortless Healthcare, <br className="hidden sm:block" /> Anytime.
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex-1 max-w-lg text-gray-700">
          <p className="font-normal text-sm sm:text-base md:text-lg leading-relaxed tracking-normal mt-2 sm:mt-4">
            Designed for simplicity. Built for life. MediH makes healthcare
            effortless — from emergency support to everyday checkups. With
            AI-powered guidance, secure access to records, and 24/7 virtual
            care, we're here to bring peace of mind to every moment that matters.
          </p>
        </div>
      </div>

      {/* Chatbot with curved ring text */}
      <div className="absolute right-4 sm:right-6 md:right-10 bottom-6 sm:bottom-10 flex flex-col items-center z-50">
        <div className="relative">
          {/* Curved text at the top of chatbot */}
          <svg
            viewBox="0 0 100 50"
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-24 h-12 sm:w-28 sm:h-14 z-40 pointer-events-none"
          >
            <defs>
              <path
                id="curveText"
                d="M15,35 A35,35 0 0,1 85,35"
                fill="transparent"
              />
            </defs>
            <text
              fontSize="11"
              className="font-semibold fill-gray-800"
            >
              <textPath href="#curveText" startOffset="50%" textAnchor="middle">
                Click here
              </textPath>
            </text>
          </svg>

          {/* Chatbot Image */}
          <div className="relative bg-white rounded-full p-1 shadow-lg">
            <img
              src={images.bot}
              alt="Chatbot"
              className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full object-cover relative z-20 cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <p className="text-xs sm:text-sm mt-2 sm:mt-3 text-center text-gray-600 font-medium">
          Assistance in One Tap!
        </p>
      </div>
    </div>
  );
};

export default Chatbot;