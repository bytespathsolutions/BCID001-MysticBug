import { useState } from "react";
import { images } from ".././assets/assets";
import { useNavigate, useLocation } from "react-router-dom";

const AuthEnterMobile = () => {
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { userType } = location?.state || {};

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSendOtp = async () => {
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/patient/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });

      const data = await res.json();

      if (data.success) {
        navigate('/auth-enter-otp', {
          state: {
            sessionId: data.sessionId,
            mobile,
            name,
            userType: userType || "patient"
          }
        });
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gray-50">
      <img
        src={images.upper_clip}
        alt="clip"
        className="absolute h-[80%] sm:h-auto top-0 sm:top-[-50px] min-w-full pointer-events-none"
      />

      <div className="flex h-full items-center justify-center px-4 sm:px-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-5xl">
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              ENTER MOBILE NUMBER
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Enter the Mobile Number to receive OTP
            </p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-3 items-center md:items-start mt-4">
              <input
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="w-[280px] sm:w-72 md:w-64 px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-[#0A4F5B] text-lg"
              />

              <div className="w-[280px] sm:w-72 md:w-64 flex items-center border border-gray-300 rounded focus-within:border-[#0A4F5B]">
                <span className="px-3 text-gray-600 text-lg">+91</span>
                <input
                  type="text"
                  maxLength={10}
                  inputMode="numeric"
                  placeholder="10-digit mobile number"
                  value={mobile}
                  onChange={(e) =>
                    setMobile(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  disabled={loading}
                  className="flex-1 px-2 py-3 rounded-r focus:outline-none text-lg"
                />
              </div>
            </div>

            <button
              className="bg-[#0A4F5B] text-white w-[280px] sm:w-72 md:w-64 px-4 py-3 rounded mt-4 hover:bg-[#083d47] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={mobile.length !== 10 || !name.trim() || loading}
              onClick={handleSendOtp}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>

          <img
            src={images.otp_man}
            alt="otp illustration"
            className="hidden sm:block w-48 sm:w-72 md:w-80 mb-8 md:mb-0"
          />
        </div>
      </div>

      <img
        src={images.lower_clip}
        alt="clip bottom"
        className="absolute h-[90%] sm:h-auto bottom-0 sm:bottom-[-90px] w-full pointer-events-none"
      />
    </div>
  );
};

export default AuthEnterMobile;