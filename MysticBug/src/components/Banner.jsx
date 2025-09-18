import { images } from "../assets/assets";

const Banner = () => {
  return (
    <div className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[660px] overflow-visible">
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
      <div className="relative flex justify-center items-center h-full pt-8 sm:pt-12 md:pt-20 lg:pt-24">
        <img
          src={images.homepage}
          alt="homepage"
          className="relative z-20 w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-auto object-contain"
        />
      </div>

      {/* Simple background for small screens */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-b from-[#008287] to-[#005B5F] -z-10"></div>
    </div>
  );
};

export default Banner;