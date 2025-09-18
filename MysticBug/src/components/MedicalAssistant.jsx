import { images } from "../assets/assets"

const MedicalAssistant = () => {
  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 pb-20 sm:pb-28 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

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
  )
}

export default MedicalAssistant