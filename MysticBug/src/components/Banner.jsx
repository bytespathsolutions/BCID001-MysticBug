import { images } from "../assets/assets";

const Banner = ({ src, text = "", para = "" }) => {
  return (
    <div className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] overflow-visible">
      {/* SVG - Hidden on small screens */}
      <svg
        className="hidden md:block absolute top-0 left-0 w-full h-[500px] md:h-[600px]"
        viewBox="0 0 1440 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          fill="url(#arcGradient)"
          d="M0,300 C360,550 1080,550 1440,300 L1440,0 L0,0 Z"
        />
        <defs>
          <linearGradient id="arcGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#008287" />
            <stop offset="100%" stopColor="#005B5F" />
          </linearGradient>
        </defs>
      </svg>

      {/* Clip Path Image - Hidden on small screens */}
      <img
        src={images.clip_path_group}
        alt="Banner Clip"
        className="hidden md:block absolute left-0 w-full h-auto"
        style={{
          top: "0",
          height: "550px",
          objectFit: "cover",
          objectPosition: "center top",
          zIndex: 10,
        }}
      />

      {/* Homepage Image - Responsive positioning */}
      <div className="relative flex justify-center items-center h-full pt-8 sm:pt-12 md:pt-10">
        <img
          src={src}
          alt="homepage"
          className="relative z-20 w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-auto object-contain"
        />
      </div>
      <h1 className="absolute left-1/2 transform -translate-x-1/2 -translate-y-[20px] text-white font-semibold text-3xl">
        {text}
      </h1>
      <p className="mt-5 md:mt-10 text-center text-gray-300 md:text-black font-normal text-base pb-4">
        {para}
      </p>

      {/* Simple background for small screens */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-b from-[#008287] to-[#005B5F] -z-10"></div>
    </div>
  );
};

export default Banner;