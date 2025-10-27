import { useState } from 'react'
import { icons, images } from '../assets/assets'
import { useLocation, useNavigate } from 'react-router-dom'
import { firebaseAuth, useAuth } from '../Context/AuthContext'

const PatientLogin = () => {
  const [inputName, setInputName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const { userType } = location?.state || {};

  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  const { signup, googleLogin, appleLogin, setUser } = useAuth();

  // Register user in MongoDB
  const registerInMongoDB = async (uid, email, userType, name) => {
    const token = await firebaseAuth.currentUser.getIdToken(true)

    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        uid,
        email,
        userType,
        name
      }),
    });

    const contentType = response.headers.get("content-type")
    let data;

    if (contentType && contentType.includes("application/json")) {
      const text = await response.text()
      data = text ? JSON.parse(text) : {}
    } else {
      const text = await response.text()
      throw new Error(`Server returned non-JSON response: ${text}`)
    }

    if (!response.ok) {
      throw new Error(data.message || `Registration failed with status ${response.status}`)
    }

    return data
  }

  // Handle Email/Password Signup
  const handleForm = async (e) => {
    e.preventDefault()
    setError(null)

    if (!inputName || !email || !password) {
      setError("All fields are required")
      return
    }

    setLoading(true)

    try {
      // Sign up to Firebase
      const userCredential = await signup(email, password);

      const currentUser = firebaseAuth.currentUser
      if (!currentUser) {
        throw new Error("Firebase user not found after signup")
      }

      // Register in MongoDB
      await registerInMongoDB(currentUser.uid, currentUser.email, userType, inputName)
      console.log("User registered in MongoDB")
      setUser(inputName)

    } catch (error) {
      console.error("Error during registration:", error)

      let errorMessage = "Registration failed. Please try again."

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already registered. Please login instead."
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password should be at least 6 characters."
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address."
      } else if (error.message) {
        errorMessage = error.message
      }

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Handle Google Login
  const handleGoogleLogin = async () => {
    setError(null)
    setLoading(true)

    try {
      const result = await googleLogin()

      const user = result.user
      const userName = user.displayName || "User"
      setUser(userName);

      // Register in MongoDB
      await registerInMongoDB(user.uid, user.email, userType, userName)

      alert("Login successful! Welcome aboard!")
      // navigate('/dashboard') // Uncomment to redirect

    } catch (error) {
      setError(error.message || "Google login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Handle Apple Login
  const handleAppleLogin = async () => {
    setError(null)
    setLoading(true)
    try {
      const result = await appleLogin()

      const user = result.user
      const userName = user.displayName || "User"
      setUser(userName);

      // Register in MongoDB
      await registerInMongoDB(user.uid, user.email, userType, userName)

      alert("Login successful! Welcome aboard!")
      // navigate('/dashboard') // Uncomment to redirect

    } catch (error) {
      setError(error.message || "Apple login failed. Please try again.")
    } finally {
      setLoading(false)
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
              Patient Sign Up
            </h1>
            <p className="font-lato font-normal text-base sm:text-18 flex items-center gap-2 whitespace-nowrap mb-2">
              Trusted Access to Your Health Journey<span className='text-green-700'> <icons.FaLeaf className='text-green-700' /></span>
            </p>
            {error && (
              <div className="bg-[#F6B7AC] border border-red-100 text-black rounded mb-4">
                <p className="text-center p-2">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleForm} className="space-y-1.5 relative z-20">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-teal-700 mb-1"
                >
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 py-3 border border-teal-600 rounded-none focus:outline-none focus:border-teal-700 text-gray-700 text-sm"
                  disabled={loading}
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
                  disabled={loading}
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
                  placeholder="At least 6 characters"
                  className="w-full px-3 py-3 border border-teal-600 rounded-none focus:outline-none focus:border-teal-700 text-gray-700 text-sm"
                  disabled={loading}
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
                disabled={loading}
                className="w-full bg-teal-700 text-white py-3 hover:bg-teal-800 transition duration-200 font-medium text-sm relative z-20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>

              <button
                onClick={handleGoogleLogin}
                type="button"
                disabled={loading}
                className="w-full border border-gray-900 text-gray-700 py-3 transition duration-200 font-medium text-sm flex items-center justify-center space-x-2 relative z-20 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <icons.FaGoogle size={20} />
                <span>Sign Up With Google</span>
              </button>

              <button
                onClick={handleAppleLogin}
                type="button"
                disabled={loading}
                className="w-full border border-gray-900 text-gray-700 py-3 transition duration-200 font-medium text-sm flex items-center justify-center space-x-2 relative z-20 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <icons.FaApple size={24} />
                <span>Sign Up with Apple ID</span>
              </button>
            </form>
          </div>
        </div>
        <div className="hidden sm:flex flex-1 justify-center items-center">
          <img
            src={images.Patient}
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
    </div>
  )
}

export default PatientLogin