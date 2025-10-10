import { useEffect, useState } from "react";
import { images } from "../../assets/assets"
import { useNavigate } from "react-router-dom";
const MedicalRecords = ({ onClose, onAddNew }) => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchMedicalRecords = async () => {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      try {
        const res = await fetch(`${BASE_URL}/medical_records`);
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

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
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
              <div className="p-2 flex flex-col gap-2 h-[200px] w-[250px] rounded-2xl bg-[#93d8c1]" key={record.id}>
                <p className="w-full">{record.name}</p>
                <p className="w-full">{record.email}</p>

                <a
                  href={`http://localhost:5000/uploads/${record.scannedPdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-full w-full object-cover rounded-2xl text-blue-800 cursor-pointer"
                >
                  {getDisplayName(record.scannedPdf)}
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
