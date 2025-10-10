import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../assets/assets";
import { useAuth } from "../../Context/AuthContext";

const Prescriptions = ({ onClose }) => {
  const { uid, loading } = useAuth();
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchPatientData = async () => {
      if (loading) return;

      try {
        const response = await fetch(`${BASE_URL}/patient/get_patient_record/${uid}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setMedicalRecords(data.medicalRecords || []);
        setPrescriptions(data.prescriptions || []);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, [uid, loading, BASE_URL]);

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-[#0a5b58] rounded-xl p-4 w-full max-w-6xl h-[96vh] relative overflow-auto">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-[#CCE4FF] text-24 font-merriweather font-bold sm:ml-11">Prescriptions</h2>
              <h2 className="text-[#CCE4FF] font-lato font-bold sm:ml-11">Click on image to view</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white text-5xl hover:text-gray-300"
            >
              &times;
            </button>
          </div>
          {loading && (
            <div className="text-white text-center p-4">
              Loading...
            </div>
          )}

          <div className="grid grid-cols-2 sm:px-10 sm:grid-cols-5 gap-6 sm:gap-0">
            {prescriptions.map((record, index) => (
              <div className="p-2 flex flex-col gap-2 h-[200px] w-[200px] rounded-2xl bg-[#93d8c1]" key={record.id || index}>
                <p>{record.name}</p>
                <p>{record.email}</p>
                <img src={record.pdf} alt={record.name} className="h-full w-full object-cover rounded-2xl" />
              </div>
            ))}
            <div className="p-2 flex flex-col h-[200px] w-[200px] rounded-2xl bg-[#93d8c1]">
              <div className="flex justify-center items-center h-full w-full bg-[#D9D9D9] rounded-full">
                <span className="text-7xl">+</span>
              </div>
            </div>
          </div>

          {/* Past medical Records */}
          <div className="flex justify-between items-center mt-4 mb-2">
            <div>
              <h2 className="text-[#CCE4FF] text-24 font-merriweather font-bold sm:ml-11">Past Medical Records</h2>
              <h2 className="text-[#CCE4FF] font-lato font-bold sm:ml-11">Click on image to view</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:px-10 sm:grid-cols-5 gap-6 sm:gap-0">
            {medicalRecords.map((record, index) => (
              <div className="p-2 flex flex-col gap-2 h-[200px] w-[200px] rounded-2xl bg-[#93d8c1]" key={record.id || index}>
                <p>{record.name}</p>
                <p>{record.email}</p>
                <img src={record.pdf} alt={record.name} className="h-full w-full object-cover rounded-2xl" />
              </div>
            ))}
            <div className="p-2 flex flex-col h-[200px] w-[200px] rounded-2xl bg-[#93d8c1]">
              <div className="flex justify-center items-center h-full w-full bg-[#D9D9D9] rounded-full">
                <span className="text-7xl">+</span>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center absolute bottom-[-10px] right-0 w-48 h-45">
            <img
              src={images.Prescriptions}
              alt="Illustration"
              className="block w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;