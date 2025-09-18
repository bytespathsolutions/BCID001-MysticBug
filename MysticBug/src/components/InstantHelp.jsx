import { images } from '../assets/assets'

const InstantHelp = () => {
  return (
    <div className="relative h-full min-h-screen w-full rounded-2xl overflow-auto p-4 pb-10">

      {/* Purple Card - Top Left */}
      <div className="bg-gradient-to-r from-[#C8C9FF] to-[#9EC6FF] max-w-md rounded-2xl p-6 shadow-lg mb-12">
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
          className="absolute top-[-73px] md:top-[-112px] right-[0px] w-85 h-85 object-cover"
        />

        <img
          src={images.repair_man}
          alt="repair man"
          className="hidden md:block absolute bottom-0 left-[40px] w-85 h-85 object-cover z-10"
        />
      </div>

      <div className="absolute bottom-[-10px] right-10 md:bottom-15 md:right-0 bg-gradient-to-r from-[#FFEEC3] to-[#EDFF9E] max-w-md rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-medium">Your 24/7 Health <br />Companion.</h1>
        <p className="mt-2 text-sm text-gray-800">
          Got symptoms at 2AM? Meet MediH’s AI-powered chatbot — your always-on health assistant. Understand concerns, get next steps, and connect to doctors in real-time.
        </p>
      </div>

    </div>
  )
}

export default InstantHelp
