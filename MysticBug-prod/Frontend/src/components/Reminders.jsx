import { useNavigate } from "react-router-dom";
import { images } from "../assets/assets"
import { Fragment } from "react/jsx-runtime";
const Reminders = ({ onClose }) => {
  const navigate = useNavigate();
  const medicalRecords = [
    { id: 1, name: "dummy" },
    { id: 2, name: "dummy" },
    { id: 3, name: "dummy" },
    { id: 4, name: "dummy" },
  ];

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-[#0a5b58] rounded-xl p-4 w-full max-w-6xl h-[96vh] relative">
          <div className="flex justify-between items-center mb-4">
            <div className="">
              <h2 className="text-white text-24 font-merriweather font-bold">Reminders</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white text-5xl hover:text-gray-300"
            >
              &times;
            </button>
          </div>
          <div>
            {medicalRecords.length > 0 ? (
              <ul className="flex flex-col gap-4 px-12">
                {
                  medicalRecords.map((record) => (
                    <div key={record.id} className="bg-[#93d8c1] p-2 px-4 rounded-2xl flex justify-between items-center">
                      <li className="text-black">{record.name}</li>
                      <p className="cursor-pointer text-black">X</p>
                    </div>
                  ))
                }
              </ul>
            ) : (
              <p>No reminders available</p>
            )}
          </div>
        </div>
        <div className="hidden sm:flex items-center absolute bottom-2 right-40 w-45 h-45">
          <img
            src={images.Reminders}
            alt="Illustration"
            className="block w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}

export default Reminders
