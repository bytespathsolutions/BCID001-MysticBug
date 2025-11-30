import { useState, useRef } from "react";
import { images } from "../assets/assets";

const OtpReset = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // only last digit
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // clear current box if it has a value
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // move focus back and clear previous box
        inputRefs.current[index - 1].focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = [...otp];
    pasteData.forEach((char, i) => {
      if (i < 6) newOtp[i] = char.replace(/\D/g, "");
    });
    setOtp(newOtp);
    if (pasteData.length === 6) {
      inputRefs.current[5].focus();
    }
  };

  const otpValue = otp.join("");
  return (
    <div className="relative h-screen overflow-hidden bg-gray-50">
      {/* Top Clip */}
      <img
        src={images.upper_clip}
        alt="clip"
        className="absolute h-[80%] sm:h-auto top-0 sm:top-[-50px] min-w-full pointer-events-none"
      />

      {/* Main Content */}
      <div className="flex h-full items-center justify-center px-4 sm:px-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-5xl">

          {/* OTP Card */}
          <div className="w-full md:w-1/2 text-center space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              ENTER OTP
            </h1>

            <p className="text-gray-600 text-lg">
              Enter the OTP sent to your Mobile Number
            </p>

            {/* OTP Inputs */}
            <div className="flex items-center gap-3 justify-center mt-4">
              {otp.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded bg-white border border-green-700
                   text-center text-xl font-semibold"
                />
              ))}
            </div>

            {/* Button */}
            <button className="bg-[#0A4F5B] text-white w-full md:w-64 px-4 py-3 rounded mt-4">
              Log in
            </button>
          </div>

          {/* Right Image */}
          <img
            src={images.otp_man}
            alt="otp illustration"
            className="hidden sm:block w-48 sm:w-72 md:w-80 mb-8 md:mb-0"
          />
        </div>
      </div>

      {/* Bottom Clip */}
      <img
        src={images.lower_clip}
        alt="clip bottom"
        className="absolute h-[90%] sm:h-auto bottom-0 sm:bottom-[-90px] w-full pointer-events-none"
      />
    </div>
  );

}

export default OtpReset
