import { icons } from "../assets/assets";
import { images } from "../assets/assets";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="relative px-5 py-8 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-start items-center text-center md:text-left gap-8">
        <div onClick={() => { navigate('/'); window.scrollTo(0, 0) }} className="flex justify-center items-center">
          <img src={images.logo} alt="logo" className="h-auto w-32 md:w-52" />
        </div>

        <div className="flex flex-col md:flex-row gap-10 md:ml-100">
          <div className="flex flex-col gap-3">
            <h1 className="text-lg font-medium text-gray-900">Quick Links</h1>
            <Link className="cursor-pointer hover:underline" to="/aboutus">About Us</Link>
            <Link className="cursor-pointer hover:underline" to="/disease">Disease</Link>
            <Link className="cursor-pointer hover:underline" to="/emergency">Emergency</Link>
            <Link className="cursor-pointer hover:underline" to="/contactus">Contact Us</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-lg font-medium text-gray-900">Follow Us</h1>
            <span className="flex items-center gap-2 cursor-pointer">
              <icons.FaFacebook /> Facebook
            </span>
            <span className="flex items-center gap-2 cursor-pointer">
              <icons.FaInstagram /> Instagram
            </span>
            <span className="flex items-center gap-2 cursor-pointer">
              <icons.FaTwitter /> X
            </span>
            <span className="flex items-center gap-2 cursor-pointer">
              <icons.FaLinkedinIn /> Linkedin
            </span>
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-[-20px] z-10">
        <img
          src={images.Group1}
          alt="tile"
          className="w-full h-auto md:h-[600px] object-contain"
        />
      </div>

      <hr className="my-5" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-center text-sm text-gray-700 gap-3">
        <div className="space-x-5">
          <Link className="cursor-pointer underline" to="/terms">Terms of Service</Link>
          <Link className="cursor-pointer underline" to="/cookies">Cookies Settings</Link>
          <Link className="cursor-pointer underline" to="/privacy">Privacy Policy</Link>
        </div>
        <span>&copy; 2025 MediH. All rights reserved.</span>
      </div>
    </div >
  );
};

export default Footer;
