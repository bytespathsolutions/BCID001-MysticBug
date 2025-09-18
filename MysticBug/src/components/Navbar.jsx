import { useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { images } from "../assets/assets";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="max-w-[1320px] h-19 mx-auto flex items-center justify-between px-4 sm:px-7.5 py-3 relative text-white">
      {/* Logo */}
      <div className="flex items-center justify-center gap-3 w-[144px] h-[55px]">
        <img src={images.logo} alt="MediH Logo" className="h-10" />
      </div>

      {/* Desktop Nav   */}
      <div className="hidden md:flex items-center justify-between gap-6 flex-1">
        {/* Search */}
        <div className="hidden lg:flex items-center w-[614px] h-[44px] bg-[#a7d6de] rounded-full overflow-hidden">
          <select className="bg-[#00424f] text-gray-300 px-3 h-full border-none outline-none">
            <option>Search</option>
          </select>
          <input
            type="text"
            placeholder="Type Here"
            className="flex-1 px-3 bg-transparent outline-none text-sm"
          />
          <button className="px-3 text-gray-800 hover:text-black">
            <FaSearch className="font-light" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6">
          <a href="/aboutus" className="text-[16px] text-[#000000]">About Us</a>
          <a href="/emergency" className="text-[16px] text-[#000000]">Emergency</a>
          <a href="/diseases" className="text-[16px] text-[#000000]">Diseases</a>
          <a href="/contactus" className="text-[16px] text-[#000000]">Contact Us</a>
          <a href="/login" className="flex items-center gap-1 text-[16px] text-[#000000]">
            Log In <FaUserCircle size={20} />
          </a>
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center text-black">
        {showMenu ? (
          <IoMdClose
            size={28}
            onClick={() => setShowMenu(false)}
            className="cursor-pointer"
          />
        ) : (
          <CiMenuBurger
            size={28}
            onClick={() => setShowMenu(true)}
            className="cursor-pointer"
          />
        )}
      </div>

      {/* Mobile Dropdown */}
      {showMenu && (
        <nav className="absolute top-[70px] left-0 w-full bg-white shadow-md flex flex-col items-start gap-4 px-6 py-4 lg:hidden z-50">
          <a onClick={() => setShowMenu(!showMenu)} href="/aboutus" className="text-[16px] text-[#000000]">About Us</a>
          <a onClick={() => setShowMenu(!showMenu)} href="/emergency" className="text-[16px] text-[#000000]">Emergency</a>
          <a onClick={() => setShowMenu(!showMenu)} href="/diseases" className="text-[16px] text-[#000000]">Diseases</a>
          <a onClick={() => setShowMenu(!showMenu)} href="/contactus" className="text-[16px] text-[#000000]">Contact Us</a>
          <a onClick={() => setShowMenu(!showMenu)} href="/login" className="flex items-center gap-1 text-[16px] text-[#000000]">
            Log In <FaUserCircle size={20} />
          </a>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
