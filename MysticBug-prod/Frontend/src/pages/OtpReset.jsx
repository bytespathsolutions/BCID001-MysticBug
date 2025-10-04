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
    <div className='relative'>
      <img
        src={images.upper_clip}
        alt="clipImage"
        className='absolute top-0 pointer-events-none' />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl text-center w-full space-y-6 mt-48 sm:px-28">
          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              ENTER OTP
            </h1>
            <p className="text-gray-600 text-lg flex items-center text-center gap-2">
              Enter the OTP sent to your Mobile Number
            </p>
            <div className="flex items-center gap-2 mt-2 justify-center">
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
                  className="h-10 w-10 rounded bg-white border border-green-700 text-center text-lg font-semibold"
                />
              ))}
            </div>
            <button className='bg-[#0A4F5B] text-white w-full p-2 mt-2'>Log in</button>
          </div>
        </div>
        <img src={images.otp_man} alt="otp_man image" />
      </div>
      <img
        src={images.lower_clip}
        alt="clipImage"
        className='absolute h-[800px] bottom-[-130px] w-full ml:200px pointer-events-none' />
    </div>
  )
}

export default OtpReset
