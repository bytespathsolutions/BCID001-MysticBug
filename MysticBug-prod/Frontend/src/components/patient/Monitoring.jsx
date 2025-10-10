import { useEffect, useState } from "react";
import { images } from "../../assets/assets"
const Monitoring = ({ onClose }) => {
  const [appointments, setAppointments] = useState([])
  const [medicalRecords, setMedicalRecords] = useState([])
  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`${BASE_URL}/appointments/fetch-all-appointments`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("fetchAppointments error:", err);
        setAppointments([]);
      }
    }
    fetchAppointments()
    const fetchMedicalRecords = async () => {
      try {
        const res = await fetch(`${BASE_URL}/medical_records`);
        if (!res.ok) throw new Error("Failed to fetch medical records");
        const data = await res.json();
        setMedicalRecords(data);
      } catch (err) {
        console.log('medical record fetch fail', err)
      }
    }
    fetchMedicalRecords()
  }, []);

  const splitFileName = (fileName) => {
    return fileName.split('-')[1]
  }
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-[#0a5b58] rounded-xl p-4 w-full max-w-6xl h-[96vh] relative overflow-auto">
          <div className="flex justify-between items-center mb-2">
            <div className="">
              <h2 className="text-white text-24 font-merriweather font-bold">Next Appointment</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white text-5xl hover:text-gray-300"
            >
              &times;
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {
              appointments.map((appointment) => (
                <div className="bg-[#93d8c1] rounded-lg p-4 text-center text-18 font-lato font-bold min-h-[100px] min-w-[260px] flex flex-col items-start ">
                  <h1>Name: {appointment.patientName}</h1>
                  <h1>reason: {appointment.reason}</h1>
                  <h1>time: {appointment.timeSlot}</h1>
                </div>
              ))}
          </div>
          <h2 className="text-white text-24 font-merriweather font-bold mt-4">Latest Records</h2>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            {medicalRecords.map((record) => (
              <div
                key={record._id || record.id}
                className="bg-[#93d8c1] rounded-lg p-4 text-center text-[18px] font-lato font-bold h-[150px] w-[250px] flex flex-col justify-center items-center"
              >
                <h1 className="text-lg">{record.name}</h1>
                <p className="text-sm font-normal text-gray-700">{record.email}</p>
                <a
                  href={`http://localhost:5000/uploads/${record.scannedPdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 text-base underline hover:text-blue-900 mt-2"
                >
                  {splitFileName(record.scannedPdf)}
                </a>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-white text-24 font-merriweather font-bold mt-4">Latest Reminders</h2>
            <div className="max-w-3xl bg-[#93d8c1] p-2 px-4 rounded-2xl flex justify-between items-center">
              {
                appointments.map((appointment) => (
                  <p>{appointment.timeSlot}, {appointment.patientName}, {appointment.reason}</p>
                ))}
            </div>
          </div>

        </div>
        <div className="hidden sm:flex items-center absolute bottom-2 right-40 w-45 h-45">
          <img
            src={images.Monitoring}
            alt="Illustration"
            className="block w-full h-full"
          />
        </div>
      </div>
    </div >
  )
}

export default Monitoring
