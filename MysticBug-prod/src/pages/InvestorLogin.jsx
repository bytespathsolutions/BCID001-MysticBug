import { useState } from 'react'
import { icons, images } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const InvestorLogin = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const handleForm = (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      setError("All fields are required")
    }
  }
  return (
    <div className='relative overflow-hidden h-screen'>
      <img
        src={images.upper_clip}
        alt="clipImage"
        className='absolute top-0 pointer-events-none h-[500px] w-[1120px]' />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center sm:justify-start px-4">
        <div className="relative z-10 max-w-md sm:max-w-2xl w-full mt-20 sm:px-28">
          <div className="text-start">
            <h1 className="font-merriweather font-bold text-48 text-[#1B1B1B]">
              Investor Log In
            </h1>
            <p className="font-lato font-normal text-base sm:text-18 flex items-center gap-2 whitespace-nowrap mb-2">
              Thank You On Believing in Our Vision<span className='text-green-700'> <icons.FaLeaf className='text-green-700' /></span>
            </p>
            {error && <div className="bg-[#F6B7AC] border border-red-100 text-black rounded">
              <p className="text-center p-2">{error}</p>
            </div>
            }
            {/* Form */}
            <form onSubmit={handleForm} className="space-y-1.5 relative z-20">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-teal-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 py-3 border border-teal-600 rounded-none focus:outline-none focus:border-teal-700 text-gray-700 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-teal-700 mb-1"
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="eg. johndoe@example.com"
                  className="w-full px-3 py-3 border border-teal-600 rounded-none focus:outline-none focus:border-teal-700 text-gray-700 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-teal-700 mb-1"
                >
                  Password*
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="examplepassword"
                  className="w-full px-3 py-3 border border-teal-600 rounded-none focus:outline-none focus:border-teal-700 text-gray-700 text-sm"
                />
                <div className="text-right mt-1">
                  <a
                    href="/forgot-password"
                    className="text-teal-600 hover:text-teal-700 underline text-xs"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-700 text-white py-3 hover:bg-teal-800 transition duration-200 font-medium text-sm relative z-20 "
              >
                Log in
              </button>

              <button
                type="submit"
                className="w-full border border-gray-900 text-gray-700 py-3 transition duration-200 font-medium text-sm flex items-center justify-center space-x-2 relative z-20 hover:bg-gray-100"
              >
                <icons.FaGoogle size={20} />
                <span>Log in With Google</span>
              </button>

              <button
                type="button"
                className="w-full border border-gray-900 text-gray-700 py-3 transition duration-200 font-medium text-sm flex items-center justify-center space-x-2 relative z-20 hover:bg-gray-100"
              >
                <icons.FaApple size={24} />
                <span>Log in with Apple ID</span>
              </button>
            </form>
          </div>
        </div>
        <div className="hidden sm:flex flex-1 justify-center items-center">
          <img
            src={images.Investor}
            alt="Patient image"
            className="w-[400px] object-contain"
          />
        </div>
      </div>

      <img
        src={images.lower_clip}
        alt="clipImage"
        className="absolute h-[550px] bottom-[-50px] sm:bottom-0 right-0 w-[500px] sm:w-[1000px] pointer-events-none z-0"
      />
    </div >
  )
}

export default InvestorLogin
