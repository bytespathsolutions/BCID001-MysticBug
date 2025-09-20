import Banner from '../components/Banner'
import { images } from '../assets/assets'
import { icons } from "../assets/assets"
const Homepage = () => {
  return (
    <div>
      <Banner src={images.homepage} />
      {/* chatbot section */}
      <div className="px-4 sm:px-12 py-6 sm:py-8 relative">
        <div className="bg-gradient-to-r from-blue-100 to-white rounded-xl sm:rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">

          {/* Left Section */}
          <div className="flex-1">
            <div className="flex gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-gray-700 mb-3 flex-wrap">
              <span className="flex items-center gap-1">
                Health <icons.FaLeaf className="text-green-600" size={12} />
              </span>
              <span className="flex items-center gap-1">
                Care <icons.FaLeaf className="text-green-600" size={12} />
              </span>
              <span className="flex items-center gap-1">
                Peace <icons.FaLeaf className="text-green-600" size={12} />
              </span>
              <span className="flex items-center gap-1">
                Simplicity <icons.FaLeaf className="text-green-600" size={12} />
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
      {/* medical emergency section */}
      <div className="px-4 sm:px-12 py-6 sm:py-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

        {/* Left Section - Text Content */}
        <div className='flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-[#FFEEC3] to-transparent rounded-xl lg:rounded-2xl'>
          <h1 className='font-medium text-3xl sm:text-4xl lg:text-5xl text-[#0B0103] mb-4 sm:mb-6 leading-tight'>
            Emergency Help, When Every Second Counts.
          </h1>
          <p className='font-medium text-base sm:text-lg lg:text-xl text-[#0B0103] leading-relaxed'>
            When every second matters, MediH's Panic Button gives you immediate access to emergency support.
            With a single tap, our system alerts nearby healthcare professionals, activates ambulance services,
            and guides you through essential first steps — ensuring help reaches you as fast as possible.
          </p>
        </div>

        {/* Right Section - Emergency Button */}
        <div className="flex-1 flex justify-center items-center relative min-h-[300px] sm:min-h-[400px]">
          <div className="relative">

            {/* Top Curved Text  */}
            <svg
              viewBox="0 0 200 100"
              className="absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 w-72 sm:w-80 h-20 sm:h-24 z-30 pointer-events-none"
            >
              <defs>
                <path
                  id="topCurve"
                  d="M39,70 A70,90 0 0,1 170,80"
                  fill="transparent"
                />
              </defs>
              <text
                fontSize="14"
                className="font-medium fill-gray-700 tracking-wide"
              >
                <textPath href="#topCurve" startOffset="50%" textAnchor="middle">
                  Immediate Medical Assistance
                </textPath>
              </text>
            </svg>

            {/* Emergency Button */}
            <div className="relative bg-white rounded-full p-2 shadow-lg">
              <img
                src={images.redLight}
                alt="Emergency red light"
                className="w-43 h-43 sm:w-50 sm:h-50 lg:w-70 lg:h-70 rounded-full object-cover cursor-pointer relative z-20"
              />
            </div>

            {/* Bottom Curved Text */}
            <svg
              viewBox="0 0 200 100"
              className="absolute -bottom-12 sm:-bottom-16 left-1/2 -translate-x-1/2 w-64 sm:w-72 h-20 sm:h-24 z-30 pointer-events-none"
            >
              <defs>
                <path
                  id="bottomCurve"
                  d="M35,30 A60,40 0 0,0 160,30"
                  fill="transparent"
                />
              </defs>
              <text
                fontSize="16"
                className="font-semibold fill-gray-800"
              >
                <textPath href="#bottomCurve" startOffset="50%" textAnchor="middle">
                  Click Here For Help
                </textPath>
              </text>
            </svg>
          </div>
        </div>

      </div>
      {/* know more section */}
      <div className="px-4 sm:px-12 py-6 sm:py-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="font-serif font-normal text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-[120%] tracking-[-0.5px]">
            Know More, Worry Less.
          </h1>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <p className="font-semibold text-[#07353D] text-sm md:text-base flex items-center gap-2">
              Health <icons.FaLeaf className="text-green-600" size={14} />
            </p>
            <p className="font-semibold text-[#07353D] text-sm md:text-base flex items-center gap-2">
              Care <icons.FaLeaf className="text-green-600" size={14} />
            </p>
            <p className="font-semibold text-[#07353D] text-sm md:text-base flex items-center gap-2">
              Peace <icons.FaLeaf className="text-green-600" size={14} />
            </p>
            <p className="font-semibold text-[#07353D] text-sm md:text-base flex items-center gap-2">
              Simplicity
            </p>
          </div>

          <p className="font-semibold text-sm md:text-base leading-[150%] max-w-5xl px-2 md:px-0">
            Learn about common conditions, their symptoms, and how to handle them —
            from heart attacks to fevers, all in one place.
          </p>
        </div>

        {/* Image */}
        <img
          src={images.banner}
          alt="Know More Banner"
          className="mx-auto mt-8 w-full max-w-7xl object-contain px-2 md:px-0"
        />
      </div>
      {/* healthcare needs section */}
      <div className="px-4 sm:px-12 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between items-start gap-8">
          {/* Image */}
          <div className="flex-shrink-0 flex-1 flex items-center">
            <img
              src={images.Offer}
              alt="Healthcare Illustration"
              className="w-full max-w-[600px] h-auto mx-auto md:mx-0 "
            />
          </div>

          {/* Text & Features */}
          <div className="w-full max-w-[632px]">
            <h1 className="font-normal text-3xl sm:text-4xl md:text-[48px] leading-snug sm:leading-[1.3] md:leading-[1.2] tracking-[-0.01em]">
              Always Here for Your Healthcare Needs
            </h1>
            <p className="font-normal text-sm sm:text-base md:text-[18px] leading-[1.4] sm:leading-[1.5] tracking-normal mt-4">
              Our 24/7 AI chatbot is designed to assist you anytime, anywhere. Experience seamless interaction for your healthcare inquiries.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-6">
              <div className='p-4 bg-purple-50 rounded shadow-md'>
                <icons.FaRegClock className='w-6 h-6 mb-2' />
                <h2 className='text-lg sm:text-[18px] md:text-[20px] leading-[1.4] tracking-[-0.01em]'>24/7 AI Chatbot</h2>
                <p className=' text-sm sm:text-base md:text-base leading-[1.5] tracking-[-0.01em]'>Instant health guidance, anytime you need it.</p>
              </div>
              <div className='p-4 bg-yellow-50 rounded shadow-md'>
                <icons.FaHandHoldingHeart className='w-6 h-6 mb-2' />
                <h2 className=' text-lg sm:text-[18px] md:text-[20px] leading-[1.4] tracking-[-0.01em]'>Real-Time Family Updates</h2>
                <p className=' text-sm sm:text-base md:text-base leading-[1.5] tracking-[-0.01em]'>Stay informed about your loved ones' care.</p>
              </div>
              <div className='p-4 bg-yellow-50 rounded shadow-md'>
                <icons.RiChatCheckLine className='w-6 h-6 mb-2' />
                <h2 className=' text-lg sm:text-[18px] md:text-[20px] leading-[1.4] tracking-[-0.01em]'>Instant Appointment Booking</h2>
                <p className=' text-sm sm:text-base md:text-base leading-[1.5] tracking-[-0.01em]'>Book virtual or in-person visits in seconds</p>
              </div>
              <div className='p-4 bg-purple-50 rounded shadow-md'>
                <icons.LuTablet className='w-6 h-6 mb-2' />
                <h2 className=' text-lg sm:text-[18px] md:text-[20px] leading-[1.4] tracking-[-0.01em]'>Telemedicine</h2>
                <p className=' text-sm sm:text-base md:text-base leading-[1.5] tracking-[-0.01em]'>Consult top doctors without leaving home</p>
              </div>
              <div className='p-4 bg-purple-50 rounded shadow-md'>
                <icons.BiBook className='w-6 h-6 mb-2' />
                <h2 className=' text-lg sm:text-[18px] md:text-[20px] leading-[1.4] tracking-[-0.01em]'>Medical Record Access</h2>
                <p className=' text-sm sm:text-base md:text-base leading-[1.5] tracking-[-0.01em]'>All your health records, securely in one place.</p>
              </div>
              <div className='p-4 bg-yellow-50 rounded shadow-md'>
                <icons.FiHome className='w-6 h-6 mb-2' />
                <h2 className=' text-lg sm:text-[18px] md:text-[20px] leading-[1.4] tracking-[-0.01em]'>Medicine Delivery</h2>
                <p className=' text-sm sm:text-base md:text-base leading-[1.5] tracking-[-0.01em]'>Get prescribed medicines delivered to your door.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* instant help section */}
      <div className="relative h-full min-h-screen w-full rounded-2xl overflow-auto">

        {/* Purple Card - Top Left */}
        <div className="bg-gradient-to-r from-[#C8C9FF] md:ml-15 max-w-md rounded-l-2xl p-6">
          <h1 className="text-2xl font-medium">Instant Help,<br />One Tap Away.</h1>
          <p className="mt-2 text-sm">
            Emergencies don't wait — and neither should you. With MediH's Panic Button, immediate assistance is just a tap away. Alerts nearby medical professionals and dispatches help quickly.
          </p>
        </div>
        <div className="relative w-full">
          <img
            src={images.clip_path_group}
            alt="center"
            className="hidden md:block md:w-full h-full object-contain mt-[-170px]"
          />

          <img
            src={images.calling_girl}
            alt="calling girl"
            className="absolute top-[-73px] md:top-[-12px] right-[70px] w-85 h-85 object-cover"
          />

          <img
            src={images.repair_man}
            alt="repair man"
            className="hidden md:block absolute bottom-10 left-[120px] w-85 h-85 object-cover z-10"
          />
        </div>

        <div className="absolute bottom-[-10px] right-10 md:bottom-15 md:right-10 bg-gradient-to-r from-[#FFEEC3] max-w-md rounded-l-2xl p-6">
          <h1 className="text-2xl font-medium">Your 24/7 Health <br />Companion.</h1>
          <p className="mt-2 text-sm text-gray-800">
            Got symptoms at 2AM? Meet MediH’s AI-powered chatbot — your always-on health assistant. Understand concerns, get next steps, and connect to doctors in real-time.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Homepage
