import { useNavigate } from "react-router-dom";
import { images } from "../../assets/assets"
import { useEffect, useState } from "react";
const Reminders = ({ onClose }) => {
  const [appointments, setAppointments] = useState([])
  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`${BASE_URL}/appointments/fetch_all_appointments`);
        const data = await res.json();
        const filteredAppointment = data.filter((app) => app.status !== "rejected")
        setAppointments(filteredAppointment);
      } catch (err) {
        console.error("fetchAppointments error:", err);
        setAppointments([]);
      }
    }
    fetchAppointments()
  }, []);
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[150]">
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
            {appointments.length > 0 ? (
              <ul className="h-[75vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-lg space-y-2">
                {appointments.map((record) => (
                  <div
                    key={record._id}
                    className="bg-gradient-to-r from-[#93d8c1] to-[#a8e6cf] p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex justify-between">
                      {/* Left Section */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          Patient Name:  {record.patientName}
                        </h3>
                        <p className="text-sm text-gray-900 flex items-center gap-1">
                          <span className="font-medium">Reason:</span>
                          <span className="capitalize">{record.reason}</span>
                        </p>
                        <p className="text-sm text-gray-900 flex items-center gap-1 mt-1">
                          <span className="font-medium">Doctor:</span>
                          <span>{record.doctor}</span>
                        </p>
                      </div>

                      {/* Right Section */}
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-16 font-medium text-gray-700">
                            {new Date(record.date).toLocaleDateString('en', {
                              day: "2-digit",
                              month: "short",
                              year: "numeric"
                            })}
                          </p>
                          <p className="px-2 text-center text-16 mt-1 rounded-full bg-white">
                            {record.timeSlot}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg">No appointments scheduled</p>
              </div>
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
