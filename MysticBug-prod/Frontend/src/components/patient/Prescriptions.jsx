import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../assets/assets";
import { useAuth } from "../../Context/AuthContext";

const Prescriptions = ({ onClose }) => {
  const { uid } = useAuth();
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const recordsResponse = await fetch(`${BASE_URL}/medical_records/archived/${uid}`);
        if (recordsResponse.ok) {
          const recordsData = await recordsResponse.json();
          setMedicalRecords(recordsData || []);
        }

        const prescriptionsResponse = await fetch(`${BASE_URL}/prescriptions/patient/${uid}`);
        if (prescriptionsResponse.ok) {
          const prescriptionsData = await prescriptionsResponse.json();
          setPrescriptions(prescriptionsData.prescriptions || []);
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, [uid, BASE_URL]);

  const getDisplayName = (filename) => {
    return filename?.split('-')[1] || filename;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[150] p-4">
      <div className="bg-[#0a5b58] rounded-xl p-6 w-full max-w-6xl h-[96vh] relative overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 flex-shrink-0">
          <div>
            <h2 className="text-[#CCE4FF] text-2xl font-merriweather font-bold">
              Medical Records & Prescriptions
            </h2>
            <p className="text-[#CCE4FF] font-lato text-sm mt-1">
              Click on any card to view details
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white text-4xl hover:text-gray-300 transition-colors leading-none"
          >
            &times;
          </button>
        </div>

        <div className="overflow-y-auto flex-1 pr-2">
          {/* Prescriptions Section */}
          <div className="mb-8">
            <h3 className="text-[#CCE4FF] text-xl font-merriweather font-bold mb-4">
              Prescriptions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {prescriptions.map((prescription, index) => (
                <div
                  className="bg-[#93d8c1] rounded-xl p-4 flex flex-col gap-2 h-[200px] hover:shadow-lg transition-shadow cursor-pointer"
                  key={prescription._id || index}
                >
                  <p className="font-semibold text-sm truncate">{`Dr. ${prescription.doctorName}`}</p>
                  <p className="font-semibold text-sm truncate">{prescription.medication}</p>
                  <p className="font-medium text-sm truncate">{prescription.notes}</p>
                  <p className="text-xs text-gray-600">{formatDate(prescription.createdAt)}</p>

                  <a
                    href={`${BASE_URL}${prescription.pdfUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center bg-[#fce2ac] rounded-lg p-2 hover:shadow-lg transition-shadow cursor-pointer min-h-0"
                    title={prescription.pdfUrl}
                  >
                    <div className="flex items-center gap-2 min-w-0 w-full">
                      <svg
                        className="w-10 h-10 flex-shrink-0 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                      </svg>
                      <p className="text-xs text-blue-800 font-medium truncate min-w-0">
                        {getDisplayName(prescription.pdfUrl)}
                      </p>
                    </div>
                  </a>
                </div>
              ))}

              <div className="bg-[#93d8c1] rounded-xl p-4 flex items-center justify-center h-[200px] hover:bg-[#7ec7b0] transition-colors cursor-pointer">
                <div className="bg-[#D9D9D9] rounded-full h-24 w-24 flex items-center justify-center hover:scale-105 transition-transform">
                  <span className="text-6xl text-gray-600">+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Past Medical Records Section */}
          <div className="mb-8">
            <h3 className="text-[#CCE4FF] text-xl font-merriweather font-bold mb-4">
              Past Medical Records
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {medicalRecords.map((record, index) => (
                <div
                  className="bg-[#93d8c1] rounded-xl p-4 flex flex-col gap-2 h-[200px] transition-shadow"
                  key={record._id || index}
                >
                  <p className="font-semibold text-sm truncate">{record.name}</p>
                  <p className="text-xs text-gray-700 truncate">{record.email}</p>
                  {record.createdAt && (
                    <p className="text-xs text-gray-600">
                      {formatDate(record.createdAt)}
                    </p>
                  )}

                  <a href={`${BASE_URL}/uploads/medicalRecords/${record.scannedPdf}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center bg-white rounded-lg p-2 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="text-center">
                      <svg
                        className="w-12 h-12 mx-auto text-red-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                      </svg>
                      <p className="text-xs mt-2 text-blue-800 font-medium break-words px-2">
                        {getDisplayName(record.scannedPdf)}
                      </p>
                    </div>
                  </a>
                </div>
              ))}
              <div
                className="bg-[#93d8c1] rounded-xl p-4 flex items-center justify-center h-[200px] hover:bg-[#7ec7b0] transition-colors cursor-pointer"
              >
                <div className="bg-[#D9D9D9] rounded-full h-24 w-24 flex items-center justify-center hover:scale-105 transition-transform">
                  <span className="text-6xl text-gray-600">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Illustration */}
        <div className="hidden sm:flex items-center absolute bottom-0 sm:bottom-[-40px] right-0 w-52 h-52 pointer-events-none">
          <img
            src={images.Prescriptions}
            alt="Illustration"
            className="block w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;