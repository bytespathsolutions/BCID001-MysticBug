import { useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { images } from "../../../MysticBug/src/assets/assets";
import { useNavigate } from "react-router-dom"
const Navbar = ({ navBG, searchBarColor }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const user = { name: "Patient Name" };// get actual user from context hook
  return (
    <header className="fixed top-0 left-0 right-0 w-full h-19 text-white flex items-center justify-between px-4 sm:px-14 py-3 z-50 shadow-md"
      style={{ backgroundColor: navBG ? navBG : null }}
    >
      {/* Logo */}
      <div onClick={() => { navigate('/'); window.scrollTo(0, 0) }} className="flex items-center justify-center gap-3 w-[144px] h-[55px] cursor-pointer">
        <img src={images.logo} alt="MediH Logo" className="h-10" />
      </div>

      {/* Desktop Nav   */}
      <div className="hidden md:flex items-center justify-between gap-6 flex-1">
        {/* Search */}
        <div className="hidden lg:flex items-center w-[614px] h-[44px] rounded-full overflow-hidden" style={{ backgroundColor: searchBarColor ? searchBarColor : null }}>
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
        <nav className="flex items-center gap-6 text-[#000000]">
          <a href="/aboutus" className=" font-normal ">About Us</a>
          <a href="/emergency" className=" font-normal ">Emergency</a>
          <a href="/diseases" className=" font-normal ">Diseases</a>
          <a href="/contactus" className=" font-normal ">Contact Us</a>
          <a href="/login" className="flex items-center gap-1  font-normal ">
            {user ? <span>{user.name}</span> : "log in"}<FaUserCircle size={20} />
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
      {
        showMenu && (
          <nav className="absolute top-full left-0 w-full bg-white text-[#000000] shadow-md flex flex-col items-start gap-4 px-6 py-4 lg:hidden z-50 font-lato">
            <a onClick={() => setShowMenu(!showMenu)} href="/aboutus" className=" font-normal">About Us</a>
            <a onClick={() => setShowMenu(!showMenu)} href="/emergency" className=" font-normal">Emergency</a>
            <a onClick={() => setShowMenu(!showMenu)} href="/diseases" className=" font-normal">Diseases</a>
            <a onClick={() => setShowMenu(!showMenu)} href="/contactus" className=" font-normal ">Contact Us</a>
            <a onClick={() => setShowMenu(!showMenu)} href="/login" className="flex items-center gap-1  font-normal ">
              Log In <FaUserCircle size={20} />
            </a>
          </nav>
        )
      }
    </header >
  );
};

export default Navbar;