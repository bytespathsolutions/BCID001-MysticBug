import { images } from '../assets/assets';

const Login = () => {
  return (
    <div className='relative min-h-screen'>
      <img
        src={images.Clippath_group}
        alt="upper wave image"
        className='absolute top-0 min-w-full h-[400px] sm:h-[650px] md:h-auto object-cover'
      />

      <div className='flex justify-center items-center px-4 sm:px-6 lg:px-8'>
        <div className='text-center mt-32 sm:mt-44'>
          <h1 className='font-bold font-merriweather text-3xl sm:text-5xl lg:text-6xl mb-3'>Log In</h1>
          <p className='font-lato font-normal mb-6 sm:mb-10 text-sm sm:text-lg'>Select login type before proceeding</p>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 mt-8 sm:mt-16 max-w-xs xs:max-w-sm sm:max-w-4xl lg:max-w-6xl mx-auto'>
            {/* Patient Card */}
            <div className='w-full'>
              <div className='p-3 sm:p-4 rounded-2xl shadow-md border-4 border-[#0A4F5B] min-h-[250px] sm:min-h-[350px] flex items-center justify-center bg-white'>
                <img
                  src={images.Patient}
                  alt="patient image"
                  className='w-[200px] sm:w-[280px] object-cover max-w-full h-auto'
                />
              </div>
              <h2 className='font-lato text-lg sm:text-2xl lg:text-3xl mt-2 text-center'>Patient</h2>
            </div>

            {/* Doctor Card */}
            <div className='w-full'>
              <div className='p-3 sm:p-4 rounded-2xl shadow-md border-4 border-[#0A4F5B] min-h-[250px] sm:min-h-[350px] flex items-center justify-center bg-white'>
                <img
                  src={images.Doctor}
                  alt="doctor image"
                  className='w-[200px] sm:w-[280px] object-cover max-w-full h-auto'
                />
              </div>
              <h2 className='font-lato text-lg sm:text-2xl lg:text-3xl mt-2 text-center'>Doctor</h2>
            </div>

            {/* Investor Card */}
            <div className='w-full sm:col-span-2 lg:col-span-1 mx-auto max-w-xs xs:max-w-sm sm:max-w-none'>
              <div className='p-3 sm:p-4 rounded-2xl shadow-md border-4 border-[#0A4F5B] min-h-[250px] sm:min-h-[350px] flex items-center justify-center bg-white'>
                <img
                  src={images.Investor}
                  alt="investor image"
                  className='w-[200px] sm:w-[280px] object-cover max-w-full h-auto'
                />
              </div>
              <h2 className='font-lato text-lg sm:text-2xl lg:text-3xl mt-2 text-center'>Investor</h2>
            </div>
          </div>
        </div>
      </div>

      <img
        src={images.Group}
        alt="bottom wave image"
        className='min-w-full absolute bottom-[-50px] sm:bottom-[-150px] md:bottom-[-200px] lg:bottom-[-320px] z-10 h-[300px] sm:h-[550px] md:h-[600px] lg:h-auto object-cover'
      />
    </div>
  )
}

export default Login;