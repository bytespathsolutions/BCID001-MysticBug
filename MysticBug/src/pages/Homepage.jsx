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

        <div className='absolute top-46 right-10 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48'>
          <img src={images.bot} alt="bot image" className='object-cover w-30 cursor-pointer' />
        </div>

      </div>
      {/* medical emergency section */}
      <div className="px-4 sm:px-12 py-10 sm:py-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

        {/* Left Section - Text Content */}
        <div className='flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-[#FFEEC3] to-transparent rounded-xl lg:rounded-2xl'>
          <h1 className='font-medium text-3xl sm:text-4xl lg:text-5xl text-[#0B0103] mb-4 sm:mb-6 leading-tight'>
            Emergency Help, When Every Second Counts.
          </h1>
          <p className='font-medium text-base sm:text-lg lg:text-xl text-[#0B0103] '>
            When every second matters, MediH's Panic Button gives you immediate access to emergency support.
            With a single tap, our system alerts nearby healthcare professionals, activates ambulance services,
            and guides you through essential first steps — ensuring help reaches you as fast as possible.
          </p>
        </div>

        {/* Right Section - Emergency Button */}
        <div className="flex-1 flex justify-center items-center relative min-h-[300px] sm:min-h-[400px]">
          <div className="relative">
            {/* Emergency Button */}
            <div className="relative bg-white p-2">
              <img
                src={images.redLight}
                alt="Emergency red light"
                className="bg-transparent w-65 h-65 sm:w-50 sm:h-50 lg:w-80 lg:h-80 rounded-full object-cover cursor-pointer relative z-20"
              />
            </div>
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

        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[480px] mx-auto mt-6 rounded-lg overflow-hidden">
          {/* Background Image */}
          <img
            src={images.DiseaseBanner7}
            alt="know more disease"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute bg-gradient-to-r to-transparent"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center h-full px-4 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 text-black">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-medium mb-1">SARS Emerges in China</h1>
            <p className="text-sm sm:text-base md:text-md mb-3 sm:mb-4 text-gray-800">2002-2003</p>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 md:mb-8">
              the Severe Acute Respiratory Syndrome (SARS) coronavirus, part of a family of viruses that
              commonly cause respiratory symptoms such as coughing and shortness of breath, is first identified
              in late 2002 in southern China. SARS spreads to more than two dozen countries across four
              continents, infecting more than eight thousand people. close to eight hundred, most within China
              and Hong Kong, by the time the outbreak is quelled in mid-2003. The virus is thought to have been
              transmitted to humans via contact with civet cats.
            </p>

            {/* Button */}
            <button className="absolute bottom-3 sm:bottom-4 md:bottom-2 right-3 sm:right-4 md:right-6 bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-2 rounded-full text-sm sm:text-base w-fit cursor-pointer transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
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
              <div className='p-4 bg-gradient-to-r from-[#C8C9FF] rounded-2xl'>
                <icons.FaRegClock className='w-6 h-6 mb-2' />
                <h2 className='text-lg sm:text-[18px] md:text-[20px] leading-[1.4] tracking-[-0.01em]'>24/7 AI Chatbot</h2>
                <p className=' text-sm sm:text-base md:text-base leading-[1.5] tracking-[-0.01em]'>Instant health guidance, anytime you need it.</p>
              </div>
              <div className='p-4 bg-gradient-to-r from-yellow-100 rounded-2xl'>
                <icons.FaHandHoldingHeart className='w-6 h-6 mb-2' />
                <h2 className=' text-lg sm:text-[18px] md:text-[20px] leading-[1.4] tracking-[-0.01em]'>Real-Time Family Updates</h2>
                <p className=' text-sm sm:text-base md:text-base leading-[1.5] tracking-[-0.01em]'>Stay informed about your loved ones' care.</p>
              </div>
              <div className='p-4 bg-gradient-to-r from-yellow-100 rounded-2xl'>
                <icons.RiChatCheckLine className='w-6 h-6 mb-2' />
                <h2 className=' text-lg sm:text-[18px] md:text-[20px] leading-[1.4] tracking-[-0.01em]'>Instant Appointment Booking</h2>
                <p className=' text-sm sm:text-base md:text-base leading-[1.5] tracking-[-0.01em]'>Book virtual or in-person visits in seconds</p>
              </div>
              <div className='p-4 bg-gradient-to-r from-[#C8C9FF] rounded-2xl '>
                <icons.LuTablet className='w-6 h-6 mb-2' />
                <h2 className=' text-lg sm:text-[18px] md:text-[20px] leading-[1.4] tracking-[-0.01em]'>Telemedicine</h2>
                <p className=' text-sm sm:text-base md:text-base leading-[1.5] tracking-[-0.01em]'>Consult top doctors without leaving home</p>
              </div>
              <div className='p-4 bg-gradient-to-r from-[#C8C9FF] rounded-2xl '>
                <icons.BiBook className='w-6 h-6 mb-2' />
                <h2 className=' text-lg sm:text-[18px] md:text-[20px] leading-[1.4] tracking-[-0.01em]'>Medical Record Access</h2>
                <p className=' text-sm sm:text-base md:text-base leading-[1.5] tracking-[-0.01em]'>All your health records, securely in one place.</p>
              </div>
              <div className='p-4 bg-gradient-to-r from-yellow-100 rounded-2xl '>
                <icons.FiHome className='w-6 h-6 mb-2' />
                <h2 className=' text-lg sm:text-[18px] md:text-[20px] leading-[1.4] tracking-[-0.01em]'>Medicine Delivery</h2>
                <p className=' text-sm sm:text-base md:text-base leading-[1.5] tracking-[-0.01em]'>Get prescribed medicines delivered to your door.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* instant help section */}
      <div className="relative h-[110vh] md:min-h-screen w-full rounded-2xl overflow-hidden md:mb-10" >

        {/* Purple Card - Top Left */}
        <div className="bg-gradient-to-r from-[#C8C9FF] md:ml-15 max-w-xl rounded-l-2xl p-6">
          <h1 className="text-2xl font-medium">Instant Help,<br />One Tap Away.</h1>
          <p className="mt-2 text-sm md:text-[16px]">
            Emergencies don’t wait — and neither should you. With MediH’s Panic Button, immediate assistance is just a tap away. Whether it's a sudden health scare, an accident, or a loved one in distress, our system alerts nearby medical professionals, dispatches ambulance services by land, water, or air, and provides you with essential first-aid instructions while help is on the way. It’s peace of mind in your pocket, designed to act when you can’t.
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
            className="absolute top-[-23px] md:top-[-80px] right-[30px] md:right-[120px] w-65 h-65 md:w-99 md:h-99 object-cover"
          />

          <img
            src={images.repair_man}
            alt="repair man"
            className="hidden md:block absolute bottom-15 left-[120px] w-85 h-85 md:w-95 md:h-95 object-cover z-10"
          />
        </div>

        <div className="absolute bottom-[-60px] right-10 md:bottom-[-45px] md:right-10 bg-gradient-to-r from-[#FFEEC3] max-w-xl rounded-l-2xl p-6 mb-10">
          <h1 className="text-2xl font-medium">Your 24/7 Health <br />Companion.</h1>
          <p className="mt-2 text-sm md:text-[16px] text-gray-800">
            Got symptoms at 2AM? Confused about what to do next? Meet MediH’s AI-powered chatbot — your always-on, always-ready health assistant. It listens to your concerns, helps you understand what might be wrong, suggests safe next steps, and connects you to doctors in real-time for virtual or in-person consultations. No more Googling symptoms. No more waiting on hold. Just simple, smart, accessible care — whenever you need it.
          </p>
        </div>
      </div>
    </div >
  )
}

export default Homepage
