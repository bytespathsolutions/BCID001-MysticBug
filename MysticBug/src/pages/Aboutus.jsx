import { FaLeaf, FaCube } from "react-icons/fa";
import { images } from "../assets/assets";

const Aboutus = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full min-h-screen px-4 sm:px-16">
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

        {/* Clip Path Image */}
        <img
          src={images.clip_path_group}
          alt="Banner Clip"
          className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-full h-auto"
          style={{
            top: "135px",
            height: "600px",
            objectFit: "cover",
            objectPosition: "center top",
            zIndex: 10,
          }}
        />

        {/* Mobile Background */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-[#008287] to-[#005B5F] -z-10"></div>

        <div
          className="absolute top-1/1 sm:top-1/4 left-1/2 transform -translate-x-1/2 text-center px-4 sm:px-16
             flex flex-col justify-center md:block h-full md:h-auto"
        >
          <h1 className="text-4xl font-semibold text-white mb-4">
            MediH Mission Statement
          </h1>
          <p className="text-white font-medium text-sm max-w-2xl mx-auto">
            Explain what your company is working on and the value you provide to your customers.
          </p>
        </div>

      </div>

      {/* About Section */}
      <section className="relative mt-5 md:m-0 w-full rounded-3xl flex flex-col md:flex-row md:justify-between gap-10 px-4 sm:px-16 py-8">
        {/* Left Text */}
        <div className="text-left max-w-3xl space-y-4 bg-gradient-to-r from-[#fff8ee] p-6 rounded-xl">
          <div className="text-teal-800 font-semibold flex flex-wrap gap-2">
            <span className="flex items-center gap-2">Health <FaLeaf /></span>
            <span className="flex items-center gap-2">Care <FaLeaf /></span>
            <span className="flex items-center gap-2">Peace <FaLeaf /></span>
            <span className="flex items-center gap-2">Simplicity</span>
          </div>

          <h2 className="font-merriweather font-normal text-4xl sm:text-48">
            About MediH
          </h2>

          <p className="leading-relaxed text-18">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius
            faucibus massa sollicitudin amet augue. Nibh metus a semper purus mauris
            duis. Lorem eu neque, tristique quis duis. Nibh scelerisque ac adipiscing
            velit non nulla in amet pellentesque. Sit turpis pretium eget maecenas.
            Vestibulum dolor mattis consectetur eget commodo vitae.
          </p>

          <p className="leading-relaxed text-18">
            Amet pellentesque sit pulvinar lorem mi a, euismod risus rhoncus.
            Elementum ullamcorper nec, habitasse vulputate. Eget dictum quis est sed
            egestas tellus, a lectus. Quam ullamcorper in fringilla arcu aliquet
            fames arcu. Lacinia eget faucibus urna, nam risus nec elementum cras
            porta. Sed elementum, sed dolor purus dolor dui. Ut dictum nulla
            pulvinar vulputate sit sagittis in eleifend dignissim. Natoque mauris
            cras molestie velit. Maecenas eget adipiscing quisque viverra lectus
            arcu, tincidunt ultrices pellentesque.
          </p>
        </div>
        <div className="absolute inset-0 pointer-events-none z-0 hidden sm:block">
          <div className="absolute bottom-[115px] right-0 h-72 w-72 rounded-full bg-[#005B5F] blur-3xl opacity-70" />
        </div>

        {/* Right Image */}
        <div className="flex justify-center items-center">
          <img
            src={images.Who_are_we}
            alt="About MediH"
            className="md:w-[450px] w-full max-w-[400px] object-cover rounded-xl z-0"
          />
        </div>
      </section>

      {/* Founder Section */}
      <section
        className="relative w-full bg-no-repeat bg-center bg-contain px-4 sm:px-16 py-24"
        style={{ backgroundImage: `url(${images.clip_path_vertical})` }}
      >
        <div className="sm:py-24 flex flex-col gap-y-24">
          <div className="flex flex-col md:flex-row md:justify-between items-start gap-8 md:gap-12">
            <div className="md:w-[45%] flex justify-start">
              <img
                src={images.owner}
                alt="Founder"
                className="w-full h-[420px] md:h-[470px] object-contain rounded-md"
              />
            </div>

            <div className="md:w-[50%] relative z-10 bg-gradient-to-r from-[#e4e5ff] to-[#f7f9ff] rounded-l-2xl p-4 md:p-6">
              <p className="font-semibold text-20 text-black mb-4">Our Founder</p>
              <h2 className="mt-2 font-merriweather text-4xl sm:text-48 font-normal text-gray-900">Founder Name Here</h2>
              <p className="mt-4 text-gray-700 leading-relaxed text-18">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolorum provident
                recusandae. Odit quia recusandae error unde accusamus doloremque cupiditate ut,
                ipsa laborum. Saepe rem iusto vitae quia eos eius facilis optio non sapiente qui.
                Reiciendis quia sapiente aliquam reprehenderit vero illum dolore.
              </p>
              <p className="mt-3 text-gray-700 leading-relaxed text-18">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid minima possimus
                eligendi, totam sunt sed qui expedita magni nihil animi commodi, voluptas quo odio
                dicta. Quae quia ipsam temporibus similique odit eveniet dolorem est reiciendis ipsa
                non modi numquam aliquid, esse atque obcaecati sit et, alias reprehenderit fugit
                voluptas doloremque?
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between items-start gap-8 md:gap-12">
            <div className="md:w-[50%] relative z-10 bg-gradient-to-r from-[#e4e5ff] to-[#f7f9ff] rounded-l-2xl order-2 md:order-1 p-4 md:p-6">
              <p className="font-semibold text-20 text-black mb-4">Our Founder</p>
              <h2 className="mt-2 font-merriweather text-4xl sm:text-48 font-normal text-gray-900">Founder Name Here</h2>
              <p className="mt-4 text-gray-700 leading-relaxed text-18">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolorum provident
                recusandae. Odit quia recusandae error unde accusamus doloremque cupiditate ut,
                ipsa laborum. Saepe rem iusto vitae quia eos eius facilis optio non sapiente qui.
                Reiciendis quia sapiente aliquam reprehenderit vero illum dolore.
              </p>
              <p className="mt-3 text-gray-700 leading-relaxed text-18">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid minima possimus
                eligendi, totam sunt sed qui expedita magni nihil animi commodi, voluptas quo odio
                dicta. Quae quia ipsam temporibus similique odit eveniet dolorem est reiciendis ipsa
                non modi numquam aliquid, esse atque obcaecati sit et, alias reprehenderit fugit
                voluptas doloremque?
              </p>
            </div>

            <div className="md:w-[45%] flex justify-end order-1 md:order-2">
              <img
                src={images.owner}
                alt="Co-Founder"
                className="w-full h-[420px] md:h-[470px] object-contain rounded-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full px-4 sm:px-16 py-6">
        <div className="w-full max-w-6xl bg-gradient-to-r from-yellow-100 rounded-l-3xl p-4 md:p-6">
          <p className="text-20 font-semibold text-black">Our values</p>
          <h2 className="font-merriweather font-normal text-48 text-black mb-4">Company Values</h2>
          <p className="text-base sm:text-18 text-gray-700 max-w-3xl mb-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
            elementum tristique. Duis cursus, mi quis viverra ornare.
          </p>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((val) => (
              <div key={val} className="flex flex-col items-start">
                <FaCube className="text-black text-3xl mb-3" />
                <h4 className="font-normal font-merriweather text-32 mb-2">Value {val}</h4>
                <p className="text-sm text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                  elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div >
  );
};

export default Aboutus;
