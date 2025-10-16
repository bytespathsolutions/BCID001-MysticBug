import { useEffect, useState } from "react";
import { images } from "../../assets/assets"

const Monitoring = ({ onClose }) => {
  const [appointments, setAppointments] = useState([])
  const [medicalRecords, setMedicalRecords] = useState([])
  const [previousDoctors, setPreviousDoctors] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`${BASE_URL}/appointments/fetch-all-appointments`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAppointments(data);
        // Extract unique doctors from past appointments
        const doctors = [...new Set(data.map(apt => apt.doctor).filter(Boolean))];
        setPreviousDoctors(doctors);
      } catch (err) {
        console.error("fetchAppointments error:", err);
        setAppointments([]);
      }
    }
    fetchAppointments();

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

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDoctor || !rating || !feedback.trim()) {
      alert("Please select a doctor, rating, and provide feedback");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${BASE_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctor: selectedDoctor,
          rating,
          feedback,
          date: new Date().toISOString()
        }),
      });

      if (!res.ok) throw new Error("Failed to submit feedback");

      alert("Feedback submitted successfully!");
      setSelectedDoctor("");
      setRating(0);
      setFeedback("");
    } catch (err) {
      console.error("Feedback submission error:", err);
      alert("Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

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

          <div className="w-full flex flex-col sm:flex-row flex-wrap gap-4">
            {appointments.length ?
              appointments.map((appointment) => (
                <div key={appointment._id} className="bg-[#93d8c1] rounded-lg p-4 text-center text-18 font-lato font-bold min-h-[100px] min-w-[260px] flex flex-col items-start ">
                  <h1>Name: {appointment.patientName}</h1>
                  <h1>reason: {appointment.reason}</h1>
                  <h1>time: {appointment.timeSlot}</h1>
                </div>
              )) :
              <p className="bg-[#93d8c1] rounded-lg p-2 w-[220px]">No Next Appointment</p>}
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
            <div className="space-y-2" >
              {appointments.length ?
                appointments.map((appointment) => (
                  <p key={appointment._id} className="max-w-3xl bg-[#93d8c1] p-2 px-4 rounded-2xl ">{new Date(appointment.date).toLocaleDateString('en', {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}, {appointment.timeSlot}, {appointment.patientName}, {appointment.reason}</p>
                )) :
                <p className="text-black bg-[#93d8c1] p-2 rounded-md w-[220px]">No latest Reminders</p>}
            </div>
          </div>

          {/* Feedback Section */}
          <div>
            <h2 className="text-white text-24 font-merriweather font-bold mt-4 mb-3">Doctor Feedback</h2>
            <div className="bg-[#93d8c1] p-6 max-w-3xl rounded-xl">
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    SELECT DOCTOR
                  </label>
                  {previousDoctors.length > 0 ? (
                    <select
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      className="w-full p-3 rounded-lg bg-[#8ccdb8] outline-none text-base font-lato"
                      required
                    >
                      <option value="">-- Choose a doctor --</option>
                      {previousDoctors.map((doctor, idx) => (
                        <option key={idx} value={doctor}>
                          {doctor}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-gray-600 text-sm italic">
                      No previous appointments found. Book an appointment first!
                    </p>
                  )}
                </div>

                {/* Rating */}
                {previousDoctors.length > 0 && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">
                        RATING
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`text-3xl transition-all ${star <= rating ? "text-yellow-500" : "text-gray-400"
                              }`}
                          >
                            ★
                          </button>
                        ))}
                        <span className="ml-2 text-gray-700 font-semibold self-center">
                          {rating > 0 ? `${rating}/5` : "Select rating"}
                        </span>
                      </div>
                    </div>

                    {/* Feedback Text */}
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">
                        YOUR FEEDBACK
                      </label>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows="4"
                        className="w-full p-3 rounded-lg bg-[#8ccdb8] outline-none text-base font-lato resize-none"
                        placeholder="Share your experience with the doctor..."
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#0a4f5b] text-white font-bold py-3 rounded-lg hover:bg-[#083d47] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "SUBMITTING..." : "SUBMIT FEEDBACK"}
                    </button>
                  </>
                )}
              </form>
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