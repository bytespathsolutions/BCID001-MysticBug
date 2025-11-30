import { useEffect, useState } from "react";
import { images } from "../../assets/assets"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
const MedicalRecords = ({ onClose, onAddNew }) => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const navigate = useNavigate()
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { uid } = useAuth()
  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const res = await fetch(`${BASE_URL}/medical_records/${uid}`);
        if (!res.ok) throw new Error("Failed to fetch medical records");
        const data = await res.json();
        setMedicalRecords(data);
      } catch (error) {
        console.error("Error while fetching medical records:", error);
      }
    };

    fetchMedicalRecords();
  }, []);

  const getDisplayName = (filename) => {
    return filename.split('-')[1]
  }
  const getDate = (date) => {
    return new Date(date).toLocaleDateString('en-us', { day: "numeric", month: "short", year: "numeric" })
  }

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[150]">
        <div className="bg-[#0a5b58] rounded-xl p-4 w-full max-w-6xl h-[96vh] relative overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="">
              <h2 className="text-white text-24 font-merriweather font-bold">Medical Records</h2>
              <h2 className="text-white font-lato font-bold">Click on image to view</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white text-5xl hover:text-gray-300"
            >
              &times;
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center overflow-auto flex-wrap gap-4">
            {medicalRecords?.map((record) => (
              <div
                className="p-2 flex flex-col gap-2 h-[200px] w-[250px] rounded-2xl bg-[#93d8c1]"
                key={record._id}
              >
                <p className="w-full font-semibold text-sm truncate">{record.name}</p>
                <p className="w-full text-xs text-gray-700 truncate">{record.email}</p>
                <p className="w-full text-xs text-gray-700 truncate">{getDate(record.createdAt)}</p>


                <a href={`${BASE_URL}/uploads/medicalRecords/${record.scannedPdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center bg-white rounded-lg p-2 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="text-center">
                    <svg
                      className="w-10 h-10 mx-auto text-red-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                    </svg>
                    <p className="text-xs mt-1 text-blue-800 font-medium break-words px-2">
                      {getDisplayName(record.scannedPdf)}
                    </p>
                  </div>
                </a>
              </div>
            ))}
            <div className="p-2 flex flex-col gap-2 h-[200px] w-[200px] rounded-2xl bg-[#93d8c1]">
              <div
                className="flex justify-center items-center h-full w-full bg-[#D9D9D9] rounded-full">
                <span onClick={onAddNew}
                  className="text-7xl cursor-pointer">+</span>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center absolute bottom-0 right-10 w-45 h-45">
            <div className="w-full max-w-4xl bg-white rounded-md whitespace-nowrap p-2">
              <h2>Upload Medical Records</h2>
            </div>
            <img
              src={images.Medical_Records}
              alt="Illustration"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div >
  )
}

export default MedicalRecords
