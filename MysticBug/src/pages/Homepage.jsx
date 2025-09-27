import Banner from '../components/Banner'
import { images } from '../assets/assets'
import { icons } from "../assets/assets"
import { useEffect, useState } from 'react'
const Homepage = () => {
  const diseasesData = [
    {
      id: 1,
      banner: images.DiseaseBanner01,
      title: "SARS Emerges in China",
      year: "2002-2003",
      description:
        "The Severe Acute Respiratory Syndrome (SARS) coronavirus, part of a family of viruses that commonly cause respiratory symptoms such as coughing and shortness of breath, is first identified in late 2002 in southern China. SARS spreads to more than two dozen countries across four continents, infecting more than eight thousand people. Close to eight hundred, most within China and Hong Kong, by the time the outbreak is quelled in mid-2003. The virus is thought to have been transmitted to humans via contact with civet cats.",
    },
    {
      id: 2,
      banner: images.DiseaseBanner02,
      title: "First Cholera Pandemic",
      year: "1817-1947",
      description:
        "Seven cholera pandemics have occured since 1817, but there global death are unclear Between 1865 & 1947 at least 23 million people died from cholera in india alone",
    },
    {
      id: 3,
      banner: images.DiseaseBanner03,
      title: "Flu Pandemic",
      year: "1830-1833",
      description:
        "The first pandemic that can be confidently attributed to the flu occured in 1580 Between 10-26 flu, pandemic have occured since the",
    },
    {
      id: 4,
      banner: images.DiseaseBanner04,
      title: "Russian flu",
      year: "1889",
      description:
        "4 million estimated deaths",
    },
    {
      id: 5,
      banner: images.DiseaseBanner05,
      title: "Spanish flu Pandemic",
      year: "1918-1920",
      description:
        "50-100 million deaths",
    },
    {
      id: 6,
      banner: images.DiseaseBanner06,
      title: "penicillin ushers in Antibiotics era",
      year: "1928",
      description:
        "Scottish scientist Alexander Fleming discovers penicillin, the first antibiotic—a class of drugs used to treat bacterial infections—marking a major milestone for global health. Widespread use of antibiotics takes off in the early 1940s during World War II.",
    },
    {
      id: 7,
      banner: images.DiseaseBanner07,
      title: "Asian Flu Pandemic",
      year: "1957-1958",
      description:
        "A new strain of influenza virus, designated H2N2, is reported in Singapore in February 1957, and soon spreads to China, Hong Kong, the United Kingdom (UK), and the United States. Though less severe than the Spanish Flu, the Asian Flu kills more than one million people worldwide.",
    },
    {
      id: 8,
      banner: images.DiseaseBanner08,
      title: "Hong Kong Flu",
      year: "1968-1969",
      description:
        ": A decade after the Asian Flu, a new strain called H3N2 emerges. Commonly called the Hong Kong Flu, it emerges first in Hong Kong, then a British colony, in July 1968.",
    },
    {
      id: 9,
      banner: images.DiseaseBanner09,
      title: "Smallpox",
      year: "1977-1980",
      description:
        "The last known case of smallpox, a viral disease that plagued humans for millennia, is diagnosed in 1977 in Somalia, following a nearly two-decade-long global vaccination campaign. Three years later the WHO formally declares it eradicated around the globe.",
    },
    {
      id: 10,
      banner: images.DiseaseBanner01,
      title: "HIV/ AIDS pandemic",
      year: "1981-2025",
      description:
        "A 1981 report by what is now the U.S. Centers for Disease Control and Prevention (CDC) describes a rare form of pneumonia that is later identified as Acquired Immunodeficiency Syndrome, or AIDS. It is the most advanced stage of Human Immunodeficiency Virus (HIV).",
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % diseasesData.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [diseasesData.length]);

  return (
    <div>
      <Banner src={images.homepage} />
      {/* chatbot section */}
      <div className="px-4 sm:px-12 py-6 sm:py-8 relative">
        <div className="bg-gradient-to-r from-blue-100 to-white rounded-xl sm:rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">

          {/* Left Section */}
          <div className="flex-1">
            <div className="flex gap-2 sm:gap-3 font-semibold font-lato sm:text-sm text-gray-700 mb-3 flex-wrap">
              <span className="flex items-center gap-1">
                Health <icons.FaLeaf className="text-[#07353D]" size={12} />
              </span>
              <span className="flex items-center gap-1">
                Care <icons.FaLeaf className="text-[#07353D]" size={12} />
              </span>
              <span className="flex items-center gap-1">
                Peace <icons.FaLeaf className="text-[#07353D]" size={12} />
              </span>
              <span className="flex items-center gap-1">
                Simplicity <icons.FaLeaf className="text-[#07353D]" size={12} />
              </span>
            </div>

            <h1 className="text-4xl md:text-56 font-merriweather font-normal text-black mb-4 leading-tight">
              Effortless Healthcare, <br className="hidden sm:block" /> Anytime.
            </h1>
          </div>

          {/* Right Section */}
          <div className="flex-1 max-w-lg text-gray-700 font-lato">
            <p className="font-normal text-sm sm:text-18 leading-relaxed tracking-normal mt-2 sm:mt-4">
              Designed for simplicity. Built for life. MediH makes healthcare
              effortless — from emergency support to everyday checkups. With
              AI-powered guidance, secure access to records, and 24/7 virtual
              care, we're here to bring peace of mind to every moment that matters.
            </p>
          </div>
        </div>

        <div className='absolute bottom-[-45px] right-10 z-50 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48'>
          <img src={images.bot} alt="bot image" className='object-cover w-30 cursor-pointer' />
        </div>

      </div>
      {/* medical emergency section */}
      <div className="px-4 sm:px-12 py-10 sm:py-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

        {/* Left Section - Text Content */}
        <div className='flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-[#FFEEC3] to-transparent rounded-xl lg:rounded-2xl'>
          <h1 className='text-4xl sm:text-56 font-normal text-[#0B0103] mb-4 sm:mb-6 leading-tight'>
            Emergency Help, When Every Second Counts.
          </h1>
          <p className='font-normal text-18 font-lato text-[#0B0103] '>
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
      <div className="relative px-4 sm:px-12 py-6 sm:py-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="font-merriweather font-normal text-4xl sm:text-56 leading-tight md:leading-[120%] tracking-[-0.5px]">
            Know More, Worry Less.
          </h1>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 font-lato font-semibold">
            <p className=" text-[#07353D] flex items-center gap-2">
              Health <icons.FaLeaf className="text-[#07353D]" size={14} />
            </p>
            <p className=" text-[#07353D] flex items-center gap-2">
              Care <icons.FaLeaf className="text-[#07353D]" size={14} />
            </p>
            <p className=" text-[#07353D] flex items-center gap-2">
              Peace <icons.FaLeaf className="text-[#07353D]" size={14} />
            </p>
            <p className=" text-[#07353D] flex items-center gap-2">
              Simplicity
            </p>
          </div>

          <p className="font-semibold text-base leading-[150%] max-w-5xl px-2 md:px-0">
            Learn about common conditions, their symptoms, and how to handle them —
            from heart attacks to fevers, all in one place.
          </p>
        </div>


        <div className="relative h-full sm:min-h-screen">
          {/* Blurry Effects (behind everything, hidden on mobile) */}
          <div className="absolute inset-0 pointer-events-none z-0 hidden sm:block">
            <div className="absolute top-[-65px] left-[-70px] h-72 w-72 rounded-full bg-[#005B5F] blur-3xl opacity-70" />
            <div className="absolute bottom-[45px] right-[-70px] h-72 w-72 rounded-full bg-[#005B5F] blur-3xl opacity-70" />
          </div>

          {/* Card */}
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[590px] mx-auto mt-6 rounded-lg overflow-hidden z-10 bg-white/60 backdrop-blur-sm shadow-lg">
            {/* Background Image */}
            <img
              src={diseasesData[currentIndex].banner}
              alt={diseasesData[currentIndex].title}
              className="absolute inset-0 w-full h-full object-cover opacity-30 transition-all duration-700"
            />

            {/* Content */}
            <div className="relative z-20 flex flex-col justify-center h-full px-4 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 text-black">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-medium mb-1">
                {diseasesData[currentIndex].title}
              </h1>
              <p className="text-sm sm:text-base md:text-md mb-3 sm:mb-4 text-gray-800">
                {diseasesData[currentIndex].year}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 md:mb-8">
                {diseasesData[currentIndex].description}
              </p>

              {/* Button */}
              <button className="absolute bottom-3 sm:bottom-4 md:bottom-2 right-3 sm:right-4 md:right-6 bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-2 rounded-full text-sm sm:text-base w-fit cursor-pointer transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>


      </div >


      {/* healthcare needs section */}
      <div className="px-4 sm:px-12" >
        <div className="flex flex-col md:flex-row md:items-center justify-between items-start gap-8">

          {/* Image with Blur */}
          <div className="relative flex-shrink-0 flex-1 flex items-center">
            {/* Blurry Ball */}
            <div className="absolute top-10 left-0 h-72 w-72 rounded-full bg-[#005B5F] blur-3xl opacity-70 z-0" />

            {/* Image */}
            <img
              src={images.Offer}
              alt="Healthcare Illustration"
              className="relative w-full max-w-[600px] h-auto mx-auto md:mx-0 z-10"
            />
          </div>

          {/* Text & Features */}
          <div className="w-full max-w-[632px]">
            <h2 className="font-merriweather font-normal text-4xl sm:text-48 leading-snug sm:leading-[1.3] md:leading-[1.2] tracking-[-0.01em]">
              Always Here for Your Healthcare Needs
            </h2>
            <p className="font-lato font-normal text-18 leading-[1.4] sm:leading-[1.5] tracking-normal mt-4">
              Our 24/7 AI chatbot is designed to assist you anytime, anywhere. Experience seamless interaction for your healthcare inquiries.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-6">
              <div className='p-4 bg-gradient-to-r from-[#C8C9FF] rounded-2xl'>
                <icons.FaRegClock className='w-6 h-6 mb-2' />
                <h2 className='font-merriweather font-regular text-20 leading-[1.4] tracking-[-0.01em]'>24/7 AI Chatbot</h2>
                <p>Instant health guidance, anytime you need it.</p>
              </div>
              <div className='p-4 bg-gradient-to-r from-yellow-100 rounded-2xl'>
                <icons.FaHandHoldingHeart className='w-6 h-6 mb-2' />
                <h2 className='font-merriweather font-regular text-20 leading-[1.4] tracking-[-0.01em]'>Real-Time Family Updates</h2>
                <p>Stay informed about your loved ones' care.</p>
              </div>
              <div className='p-4 bg-gradient-to-r from-yellow-100 rounded-2xl'>
                <icons.RiChatCheckLine className='w-6 h-6 mb-2' />
                <h2 className='font-merriweather font-regular text-20 leading-[1.4] tracking-[-0.01em]'>Instant Appointment Booking</h2>
                <p>Book virtual or in-person visits in seconds</p>
              </div>
              <div className='p-4 bg-gradient-to-r from-[#C8C9FF] rounded-2xl '>
                <icons.LuTablet className='w-6 h-6 mb-2' />
                <h2 className='font-merriweather font-regular text-20 leading-[1.4] tracking-[-0.01em]'>Telemedicine</h2>
                <p>Consult top doctors without leaving home</p>
              </div>
              <div className='p-4 bg-gradient-to-r from-[#C8C9FF] rounded-2xl '>
                <icons.BiBook className='w-6 h-6 mb-2' />
                <h2 className='font-merriweather font-regular text-20 leading-[1.4] tracking-[-0.01em]'>Medical Record Access</h2>
                <p>All your health records, securely in one place.</p>
              </div>
              <div className='p-4 bg-gradient-to-r from-yellow-100 rounded-2xl '>
                <icons.FiHome className='w-6 h-6 mb-2' />
                <h2 className='font-merriweather font-regular text-20 leading-[1.4] tracking-[-0.01em]'>Medicine Delivery</h2>
                <p>Get prescribed medicines delivered to your door.</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* instant help section */}
      <div div className="relative h-full w-full rounded-2xl overflow-hidden md:mb-10" >

        <div className="mt-5 sm:mt-0 bg-gradient-to-r from-[#C8C9FF] sm:ml-[24px] max-w-xl rounded-l-2xl p-6">
          <h1 className="font-normal font-merriweather text-18 sm:text-56 leading-tight">Instant Help,One Tap Away.</h1>
          <p className="mt-2 text-base sm:text-18 font-lato">
            Emergencies don’t wait — and neither should you. With MediH’s Panic Button, immediate assistance is just a tap away. Whether it's a sudden health scare, an accident, or a loved one in distress, our system alerts nearby medical professionals, dispatches ambulance services by land, water, or air, and provides you with essential first-aid instructions while help is on the way. It’s peace of mind in your pocket, designed to act when you can’t.
          </p>
        </div>
        <div className="relative h-full w-full">
          <img
            src={images.clip_path_group}
            alt="center"
            className="hidden md:block md:w-full h-full object-contain mt-[-170px]"
          />

          <img
            src={images.calling_girl}
            alt="calling girl"
            className="static sm:absolute top-[-23px] md:top-[-34%] right-[30px] md:right-[120px] object-cover w-55 h-55 sm:w-65 sm:h-65"
          />

          <img
            src={images.repair_man}
            alt="repair man"
            className="hidden md:block absolute bottom-0 left-[120px] w-55 h-55 sm:w-65 sm:h-65 object-cover z-10"
          />
        </div>

        <div className="static sm:absolute bottom-[-60px] right-10 md:bottom-[-45px] md:right-10 bg-gradient-to-r from-[#FFEEC3] max-w-xl rounded-l-2xl p-6 mb-10">
          <h1 className="font-normal font-merriweather text-18 sm:text-56 leading-tight">Your 24/7 Health <br />Companion.</h1>
          <p className="mt-2 text-base sm:text-18 font-lato">
            Got symptoms at 2AM? Confused about what to do next? Meet MediH’s AI-powered chatbot — your always-on, always-ready health assistant. It listens to your concerns, helps you understand what might be wrong, suggests safe next steps, and connects you to doctors in real-time for virtual or in-person consultations. No more Googling symptoms. No more waiting on hold. Just simple, smart, accessible care — whenever you need it.
          </p>
        </div>
      </div>
    </div >
  )
}

export default Homepage

