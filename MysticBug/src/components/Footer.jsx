import { useNavigate } from 'react-router-dom';
import { images } from '../assets/assets';
import { Link } from 'react-router-dom';
import { icons } from '../assets/assets';
const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full px-4 sm:px-16 py-8 bg-white">
      <div className="w-full flex flex-col md:flex-row md:justify-between items-center text-center md:text-left gap-8 max-w-5xl">
        <div onClick={() => { navigate('/'); window.scrollTo(0, 0) }} className="flex justify-center items-center cursor-pointer">
          <img src={images.logo} alt="logo" className="h-auto w-32 md:w-52" />
        </div>

        <div className="flex flex-col md:flex-row gap-5 md:gap-10 p-4 relative z-20">
          <div className="flex flex-col gap-3">
            <h1 className="text-lg font-medium text-gray-900">Quick Links</h1>
            <Link className="cursor-pointer hover:underline hover:text-[#008287] transition-colors" to="/aboutus">About Us</Link>
            <Link className="cursor-pointer hover:underline hover:text-[#008287] transition-colors" to="/disease">Disease</Link>
            <Link className="cursor-pointer hover:underline hover:text-[#008287] transition-colors" to="/emergency">Emergency</Link>
            <Link className="cursor-pointer hover:underline hover:text-[#008287] transition-colors" to="/contactus">Contact Us</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-lg font-medium text-gray-900">Follow Us</h1>
            <span className="flex items-center gap-2 cursor-pointer hover:text-[#008287] transition-colors">
              <icons.FaFacebook /> Facebook
            </span>
            <span className="flex items-center gap-2 cursor-pointer hover:text-[#008287] transition-colors">
              <icons.FaInstagram /> Instagram
            </span>
            <span className="flex items-center gap-2 cursor-pointer hover:text-[#008287] transition-colors">
              <icons.FaTwitter /> X
            </span>
            <span className="flex items-center gap-2 cursor-pointer hover:text-[#008287] transition-colors">
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

      <div className="w-full flex flex-col md:flex-row items-center justify-between text-center text-sm text-gray-700 gap-3 relative z-20">
        <div className="space-x-5">
          <Link className="cursor-pointer underline hover:text-[#008287] transition-colors" to="/terms">Terms of Service</Link>
          <Link className="cursor-pointer underline hover:text-[#008287] transition-colors" to="/cookies">Cookies Settings</Link>
          <Link className="cursor-pointer underline hover:text-[#008287] transition-colors" to="/privacy">Privacy Policy</Link>
        </div>
        <span>&copy; 2025 MediH. All rights reserved.</span>
      </div>
    </div>
  );
};

export default Footer