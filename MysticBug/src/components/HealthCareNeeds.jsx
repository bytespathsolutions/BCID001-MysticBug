
import { icons } from "../assets/assets"
import { images } from '../assets/assets'

const HealthCareNeeds = () => {
  return (
    <div className="px-4 sm:px-8 md:px-10 py-8 pb-28 ">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Image */}
        <div className="flex-shrink-0 flex-1 ">
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
  )
}

export default HealthCareNeeds;
