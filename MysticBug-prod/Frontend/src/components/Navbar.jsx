import { useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { images } from "../assets/assets"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { user, userName, logout, role } = useAuth();
  const displayName = userName || user;

  // Function to get dashboard path based on role
  const getDashboardPath = () => {
    if (!role) return "/";
    return `/${role}-dashboard`;
  };
  const { pathname } = useLocation();

  // Default Colors
  let navBG = "white";
  let searchBarColor = "#93ced8";
  let searchSelectorColor = "#0a4f5b";

  // Change colors based on dashboard
  if (pathname.includes("patient-dashboard")) {
    navBG = "#76b1c1";
    searchBarColor = "#93d8c1";
    searchSelectorColor = "#0a5b58";
  }

  if (pathname.includes("doctor-dashboard")) {
    navBG = "#f3e8d1";
    searchBarColor = "#fce2ac";
    searchSelectorColor = "#fdbc23";
  }

  if (pathname.includes("admin-dashboard")) {
    navBG = "#d1e8f3";
    searchBarColor = "#acd8f6";
    searchSelectorColor = "#236ffd";
  }

  if (pathname.includes("investor-dashboard")) {
    navBG = "#dbedee";
    searchBarColor = "#75cac2";
    searchSelectorColor = "#115a4c";
  }

  return (
    <header className={`w-full h-19 bg-white flex items-center justify-between px-4 sm:px-14 py-3 z-50 shadow-md ${pathname.includes("-dashboard") ? "fixed top-0 z-[100]" : "relative z-[100]"}`}
      style={{ backgroundColor: navBG }} >
      {/* Logo */}
      <div onClick={() => {
        navigate('/');
        window.scrollTo(0, 0);
        setShowMenu(false);
      }} className="flex items-center justify-center gap-3 w-[144px] h-[55px] cursor-pointer">
        <img src={images.logo} alt="MediH Logo" className="h-10" />
      </div>

      {/* Desktop Nav   */}
      <div className="hidden md:flex items-center justify-between gap-6 flex-1">
        {/* Search */}
        <div className="hidden lg:flex items-center w-[614px] h-[44px] rounded-full border  border-gray-700 overflow-hidden" style={{ backgroundColor: searchBarColor }}>
          <select
            className="text-gray-300 px-3 h-full border-none outline-none"
            style={{ backgroundColor: searchSelectorColor }}
          >
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
        {/* links */}
        <nav className="flex items-center gap-4 text-[#000000] whitespace-nowrap">
          {displayName && <Link to={getDashboardPath()}>Dashboard</Link>}
          <Link to="/aboutus" className="font-normal">About Us</Link>
          <Link to="/emergency" className="font-normal">Emergency</Link>
          <Link to="/diseases" className="font-normal">Diseases</Link>
          <Link to="/contactus" className="font-normal">Contact Us</Link>
          <div className="relative group">
            <button
              onClick={displayName ? null : () => navigate('/login')}
              className="flex items-center gap-1 font-normal focus:outline-none"
            >
              {displayName ? <span>{displayName}</span> : "Log in"} <FaUserCircle size={20} />
            </button>
            {displayName && <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-40">
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>}
          </div>
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

      {/* Mobile Dropdown - */}
      {
        showMenu && (
          <nav className="absolute top-full left-0 w-full bg-white text-[#000000] shadow-md flex flex-col items-start gap-4 px-6 py-4 md:hidden z-[200] font-lato">
            {displayName && (
              <Link
                className="font-normal"
                onClick={() => setShowMenu(!showMenu)}
                to={getDashboardPath()}
              >
                Dashboard
              </Link>
            )}
            <Link onClick={() => setShowMenu(!showMenu)} to="/aboutus" className="font-normal">About Us</Link>
            <Link onClick={() => setShowMenu(!showMenu)} to="/emergency" className="font-normal">Emergency</Link>
            <Link onClick={() => setShowMenu(!showMenu)} to="/diseases" className="font-normal">Diseases</Link>
            <Link onClick={() => setShowMenu(!showMenu)} to="/contactus" className="font-normal">Contact Us</Link>

            <div className="relative group">
              <button
                onClick={displayName ? null : () => {
                  navigate('/login');
                  setShowMenu(false)
                }}
                className="flex items-center gap-1 font-normal focus:outline-none"
              >
                {displayName ? <span>{displayName}</span> : "Log in"} <FaUserCircle size={20} />
              </button>

              {displayName && (
                <div className="absolute right-15 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200">
                  <button
                    onClick={() => {
                      logout();
                      setShowMenu(false);

                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
        )
      }

    </header >
  );
};

export default Navbar;