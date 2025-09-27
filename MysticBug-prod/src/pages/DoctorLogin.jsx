import { useState } from 'react'
import { images, icons } from '../assets/assets'

const DoctorLogin = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const handleForm = () => {
    if (!name || !email || !password) {
      setError("All fields are required")
    }
  }
  return (
    <div className='relative'>
      <img src={images.upper_clip} alt="clipImage" className='absolute top-0 pointer-events-none' />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center sm:justify-start px-4">
        <div className="max-w-md sm:max-w-3xl w-full space-y-6 mt-48 sm:px-28">
          {/* Header */}
          <div className="text-start">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Doctor Log In
            </h1>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              Your Expertise Saves Lives. We're Honored to Support You<span className='text-green-700a'> <icons.FaLeaf className='text-green-700' /></span>
            </p>
            {error && <div className="bg-red-400 border border-red-100 text-black rounded">
              <p className="text-center p-2">{error}</p>
            </div>
            }

          </div>

          {/* Form */}
          <form onSubmit={handleForm} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-teal-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border-2 border-teal-600 rounded-none focus:outline-none focus:border-teal-700 text-gray-700"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-teal-700 mb-2">
                Email*
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eg. johndoe@example.com"
                className="w-full px-4 py-3 border-2 border-teal-600 rounded-none focus:outline-none focus:border-teal-700 text-gray-700"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-teal-700 mb-2">
                Password*
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="examplepassword"
                className="w-full px-4 py-3 border-2 border-teal-600 rounded-none focus:outline-none focus:border-teal-700 text-gray-700"
              />
              <div className="text-right mt-2">
                <a href="#" className="text-teal-600 hover:text-teal-700 underline text-sm">
                  Forgot your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-700 text-white py-3 px-4 hover:bg-teal-800 transition duration-200 font-medium text-lg"
            >
              Log in
            </button>

            <button
              type="button"
              className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 hover:bg-gray-50 transition duration-200 font-medium text-lg flex items-center justify-center space-x-3"
            >
              <span>Log in with Google</span>
            </button>
          </form>
        </div>
        <img src={images.Doctor} alt="doctor image" className='hidden sm:block' />
      </div>
      <img src={images.lower_clip} alt="clipImage" className='absolute h-[800px] bottom-[-130px] w-full ml:200px pointer-events-none' />
    </div>
  )
}

export default DoctorLogin
