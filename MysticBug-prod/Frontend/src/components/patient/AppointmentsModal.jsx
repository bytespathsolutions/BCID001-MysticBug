import React, { useEffect, useState } from "react";
import { images, icons } from "../../assets/assets";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../../Context/AuthContext";
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const hours = [
  "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM",
  "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM",
  "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM",
];

const formatDateYYYYMMDD = (d) => {
  const tzOffset = d.getTimezoneOffset() * 60000;
  const localISO = new Date(d - tzOffset).toISOString().slice(0, 10);
  return localISO;
};

const AppointmentsModal = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarStartDate, setCalendarStartDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [doctorsData, setDoctorsData] = useState([]);

  // Form state
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [reason, setReason] = useState("");
  const [doctor, setDoctor] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [showDoctorsPopup, setShowDoctorsPopup] = useState(false);
  const [reviewPopup, setReviewPopup] = useState(false);

  // Feedback states
  const [selectedDoctorForReview, setSelectedDoctorForReview] = useState("");
  const [doctorReviews, setDoctorReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [doctorRatings, setDoctorRatings] = useState({});

  // loaded appointments for the week
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userActions, setUserActions] = useState({});

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { uid } = useAuth();

  // Helper to convert "8 AM" etc. to 24h number
  const to24Hour = (time) => {
    const [hour, meridian] = time.split(" ");
    let h = parseInt(hour);
    if (meridian === "PM" && h !== 12) h += 12;
    if (meridian === "AM" && h === 12) h = 0;
    return h;
  };

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  // Compute the week array based on selectedDate (Sunday-start)
  const getWeekDates = () => {
    const start = new Date(selectedDate);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  const weekDates = getWeekDates();

  // Fetch appointments for this week
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const start = formatDateYYYYMMDD(weekDates[0]);
        const end = formatDateYYYYMMDD(weekDates[6]);
        const res = await fetch(`${BASE_URL}/appointments?start=${start}&end=${end}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("fetchAppointments error:", err);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [selectedDate]);

  const filteredAppointment = appointments
  const appointmentMap = filteredAppointment.reduce((acc, a) => {
    const appointmentDate = new Date(a.date);
    const dateKey = formatDateYYYYMMDD(appointmentDate);
    const key = `${dateKey}_${a.timeSlot}`;

    if (!acc[key]) acc[key] = [];
    acc[key].push(a);
    return acc;
  }, {});

  // Determine available hours based on selected date
  const getAvailableHours = () => {
    if (isToday(calendarStartDate)) {
      const currentHour = new Date().getHours();
      return hours.filter((time) => to24Hour(time) > currentHour);
    }
    return hours;
  };

  const availableHours = getAvailableHours();

  // Get available doctors for a specific time slot
  const getAvailableDoctorsForSlot = (timeSlot) => {
    const dateStr = formatDateYYYYMMDD(calendarStartDate);
    const slotKey = `${dateStr}_${timeSlot}`;
    const existingAppointments = appointmentMap[slotKey] || [];

    // Get list of doctors who already have confirmed/pending appointments at this time
    const bookedDoctors = existingAppointments
      .filter(apt => apt.status === "confirmed" || apt.status === "pending")
      .map(apt => apt.doctor);

    // Return doctors who are NOT in the booked list
    return doctorsData.filter(doc => !bookedDoctors.includes(doc.name));
  };

  // Check if a time slot is completely full (no doctors available)
  const isTimeSlotFullyBooked = (timeSlot) => {
    return getAvailableDoctorsForSlot(timeSlot).length === 0;
  };

  // Update timeSlot when calendarStartDate changes or appointments/doctors update
  useEffect(() => {
    const available = getAvailableHours();
    // Find first slot that has available doctors
    const firstAvailableSlot = available.find(slot => !isTimeSlotFullyBooked(slot));
    if (firstAvailableSlot) {
      setTimeSlot(firstAvailableSlot);
    } else {
      setTimeSlot(available[0] || "");
    }
  }, [calendarStartDate, appointments, doctorsData]);

  const handleSave = async (e) => {
    e.preventDefault();
    const dateStr = formatDateYYYYMMDD(calendarStartDate);

    if (!reason || !timeSlot || !doctor) {
      alert("Please provide all required fields.");
      return;
    }

    // Check if the selected doctor is available at this time
    const availableDoctors = getAvailableDoctorsForSlot(timeSlot);
    const isDoctorAvailable = availableDoctors.some(doc => doc.name === doctor);

    if (!isDoctorAvailable) {
      alert(`Dr. ${doctor} is not available at ${timeSlot}. Please select a different time or doctor.`);
      return;
    }

    const payload = {
      patientName: patientName || "Anonymous",
      age,
      reason,
      doctor,
      date: dateStr,
      timeSlot,
      status: "pending",
      patientId: uid
    };

    try {
      const res = await fetch(`${BASE_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to save");
      }

      const result = await res.json();
      const created = result.appointment || result;

      setAppointments((prev) => [...prev, created]);

      // Reset form
      setPatientName("");
      setAge("");
      setReason("");
      setDoctor("");
      const available = getAvailableHours();
      const firstAvailableSlot = available.find(slot => !isTimeSlotFullyBooked(slot));
      setTimeSlot(firstAvailableSlot || available[0] || "");
      setShowForm(false);

      alert("Appointment booked successfully!");
    } catch (err) {
      console.error("Save error:", err);
      alert("Could not save appointment: " + err.message);
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/doctors`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setDoctorsData(data.doctors);
      } catch (err) {
        console.error("fetchDoctors error:", err);
        setDoctorsData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (showDoctorsPopup) {
      fetchAllDoctorRatings();
    }
  }, [showDoctorsPopup]);

  const fetchAllDoctorRatings = async () => {
    try {
      const res = await fetch(`${BASE_URL}/feedback/ratings`);
      if (!res.ok) throw new Error("Failed to fetch ratings");
      const data = await res.json();

      const ratingsMap = {};
      data.ratings.forEach(r => {
        ratingsMap[r.doctor] = {
          averageRating: r.averageRating,
          totalReviews: r.totalReviews
        };
      });
      setDoctorRatings(ratingsMap);
    } catch (err) {
      console.error("Failed to fetch doctor ratings:", err);
    }
  };

  useEffect(() => {
    if (reviewPopup && selectedDoctorForReview) {
      fetchDoctorReviews(selectedDoctorForReview);
    }
  }, [reviewPopup, selectedDoctorForReview]);

  const fetchDoctorReviews = async (doctorName) => {
    try {
      setLoadingReviews(true);
      const res = await fetch(`${BASE_URL}/feedback?doctor=${encodeURIComponent(doctorName)}`);

      if (!res.ok) throw new Error("Failed to fetch reviews");

      const data = await res.json();
      setDoctorReviews(data.reviews || []);
      setAverageRating(data.averageRating || 0);
      setTotalReviews(data.totalReviews || 0);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      setDoctorReviews([]);
      setAverageRating(0);
      setTotalReviews(0);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleLikes = async (reviewId) => {
    try {
      const res = await fetch(`${BASE_URL}/feedback/${reviewId}/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: uid }),
      });
      const updated = await res.json();
      setDoctorReviews((prev) =>
        prev.map((r) => (r._id === updated._id ? updated : r))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDisLikes = async (reviewId) => {
    try {
      const res = await fetch(`${BASE_URL}/feedback/${reviewId}/dislike`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: uid }),
      });
      const updated = await res.json();
      setDoctorReviews((prev) =>
        prev.map((r) => (r._id === updated._id ? updated : r))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[150] p-4">
      <div className="bg-[#0a5b58] rounded-xl p-4 w-full max-w-6xl h-[96vh] relative mt-0 sm:mt-0 md:mt-0 lg:mt-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold">Appointments</h2>
          <div className="space-x-4">
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#93d8c1] text-green-900 px-3 py-1 rounded hover:bg-green-200 transition-all duration-300"
            >
              Book Appointment
            </button>
            <button
              onClick={onClose}
              className="text-white text-2xl hover:text-gray-300"
            >
              &times;
            </button>
          </div>
        </div>

        <div className="overflow-auto">
          <div
            className="grid border border-green-800 h-[75vh]"
            style={{
              gridTemplateColumns: `80px repeat(${7}, 1fr)`,
            }}
          >
            <div className="border border-green-800 bg-[#93d8c1]"></div>

            {weekDates.map((date, idx) => (
              <div
                key={`head-${idx}`}
                className="border border-green-800 py-6 bg-[#93d8c1] text-green-900 text-center"
              >
                <div className="text-xs">{days[date.getDay()]}</div>
                <div className="text-sm font-semibold">{date.getDate()}</div>
              </div>
            ))}

            {hours.map((hour, i) => (
              <React.Fragment key={`row-${i}`}>
                <div
                  className="border border-green-800 py-2 text-xs bg-[#93d8c1] text-center"
                  key={`hour-${i}`}
                >
                  {hour}
                </div>

                {weekDates.map((date, j) => {
                  const dateKey = formatDateYYYYMMDD(date);
                  const cellKey = `${dateKey}_${hour}`;
                  const cellAppointments = appointmentMap[cellKey] || [];
                  const isTodayCell = isToday(date);

                  return (
                    <div
                      key={`cell-${i}-${j}`}
                      className={`border border-green-800 p-1 text-center ${isTodayCell ? "bg-green-900 text-white" : "bg-[#93d8c1]"}`}
                      style={{ minHeight: 60, maxHeight: 60 }}
                    >
                      {cellAppointments.length === 0 ? (
                        <div className="h-full w-full">&nbsp;</div>
                      ) : (
                        <div className="flex flex-col gap-1 items-start h-full ">
                          {cellAppointments.map((a) => (
                            <div
                              key={a._id}
                              className={`w-full overflow-y-auto text-left rounded px-1 py-0.5 ${a.status === "confirmed"
                                ? "bg-purple-500 text-white"
                                : a.status === "pending"
                                  ? "bg-yellow-400 text-black"
                                  : "bg-red-500 text-white"
                                } text-xs`}
                            >
                              <div className="font-semibold text-[10px]">
                                {a.patientName}
                              </div>
                              <div className="text-[9px]">
                                {a.reason},{" "}
                                <span className="text-[8px] opacity-80">
                                  {a.status === "pending"
                                    ? "⏳"
                                    : a.status === "confirmed"
                                      ? "✓"
                                      : "✗"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {showForm && (
          <div className="absolute top-[68px] right-0 w-[230px] bg-[#93d8c1] p-4 rounded-lg h-[74.7vh] overflow-auto">
            <button
              onClick={() => setShowForm(false)}
              className="text-black font-lato text-4xl hover:text-gray-600 cursor-pointer"
            >
              &times;
            </button>
            <h2 className="text-center text-2xl font-merriweather mb-1">
              Book <br /> Appointment
            </h2>
            <div className="flex flex-col mt-2 gap-1">
              <label className="text-xs">PATIENT NAME</label>
              <input
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                type="text"
                className="p-1 rounded bg-[#8ccdb8] outline-none text-sm"
                placeholder="Name (optional)"
              />
              <label className="text-xs">PATIENT AGE</label>
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                className="p-1 rounded bg-[#8ccdb8] outline-none text-sm"
                placeholder="age"
                min={1}
                max={90}
              />

              <label className="text-xs">REASON</label>
              <input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                type="text"
                className="p-1 rounded bg-[#8ccdb8] outline-none text-sm"
                placeholder="e.g. Fever, Follow-up"
              />

              <label className="text-xs">DATE</label>
              <input
                type="date"
                value={calendarStartDate.toISOString().split('T')[0]}
                onChange={(e) => setCalendarStartDate(new Date(e.target.value))}
                className="w-full p-1 rounded bg-[#8ccdb8] outline-none text-sm"
              />

              <label className="text-xs">TIME</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="p-1 rounded bg-[#8ccdb8] outline-none text-sm"
              >
                <option value="">Select time</option>
                {availableHours.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>

              <label className="text-xs">DOCTOR</label>
              <input
                type="text"
                value={doctor}
                onClick={() => setShowDoctorsPopup(true)}
                readOnly
                className="p-1 rounded bg-[#8ccdb8] mb-2 outline-none text-sm cursor-pointer"
                placeholder="Select Doctor"
              />
              <button
                onClick={handleSave}
                className="rounded bg-[#0a4f5b] py-2 text-white"
                disabled={loading}
              >
                {loading ? "Saving..." : "SAVE DETAILS"}
              </button>
            </div>
          </div>
        )}

        {showDoctorsPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[200]">
            <div className="bg-[#d6f7ff] rounded-2xl w-full max-w-3xl p-4 h-[85vh] overflow-y-auto relative">
              <button
                onClick={() => setShowDoctorsPopup(false)}
                className="absolute top-2 right-4 text-3xl font-bold text-[#0a5b58]"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold text-[#0a5b58] mb-2">
                Select Doctor for {timeSlot} on {calendarStartDate.toLocaleDateString()}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Showing available doctors for selected time slot
              </p>
              <ul className="space-y-3">
                {doctorsData.map((doc, index) => {
                  const realRating = doctorRatings[doc.name];
                  const displayRating = realRating
                    ? `${realRating.averageRating} (${realRating.totalReviews} reviews)`
                    : "No ratings yet";

                  return (
                    <li
                      key={index}
                      className="p-3 rounded-xl flex justify-between items-center transition-all duration-200 bg-white"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={images.male_doctor}
                          alt={doc.name}
                          className="w-[70px] h-[70px] rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                          <h1 className="font-medium text-black">
                            Dr. {doc.name}
                          </h1>
                          <p className="text-sm text-gray-500">{doc.specialization}</p>
                          <p className="text-sm text-gray-500">{doc.qualification}</p>
                          <span className="text-xs text-gray-500">
                            {doc.experience}
                          </span>
                          <span className="text-sm text-yellow-600 font-semibold">
                            ⭐ {displayRating}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          className="bg-[#0a5b58] text-white px-3 py-1 rounded-md text-sm"
                          onClick={() => {
                            setSelectedDoctorForReview(doc.name);
                            setReviewPopup(true);
                            setShowDoctorsPopup(false);
                          }}
                        >
                          REVIEWS
                        </button>
                        <button
                          className="bg-[#0a5b58] text-white hover:bg-[#083d47] px-3 py-1 rounded-md text-sm"
                          onClick={() => {
                            setDoctor(doc.name);
                            setShowDoctorsPopup(false);
                          }}
                        >
                          SELECT
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        {reviewPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[200] p-4">
            <div className="bg-[#d6f7ff] rounded-2xl w-full max-w-5xl h-[91vh] overflow-y-auto relative shadow-2xl">
              <div className="sticky top-0 bg-[#d6f7ff] z-10 p-6 pb-4 border-b border-[#b8e6f0]">
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-3xl font-bold text-[#0a5b58]">
                    {selectedDoctorForReview}
                  </h1>
                  <button
                    onClick={() => {
                      setReviewPopup(false);
                      setSelectedDoctorForReview("");
                    }}
                    className="rounded-lg px-5 py-2 text-white bg-[#0a5b58] hover:bg-[#083d47] transition-colors font-semibold"
                  >
                    BACK
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex flex-col items-start">
                    <div className="text-5xl font-bold text-[#0a5b58]">
                      {averageRating.toFixed(1)}
                    </div>
                    <div className="flex gap-1 text-2xl">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < Math.round(averageRating)
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">{totalReviews} reviews</div>
                  </div>

                  <div className="flex-1 max-w-md space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const starReviews = doctorReviews.filter((r) => r.rating === star);
                      const percentage =
                        totalReviews > 0 ? (starReviews.length / totalReviews) * 100 : 0;
                      return (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-700 w-3">
                            {star}
                          </span>
                          <div className="flex-1 bg-gray-300 rounded-full h-3 overflow-hidden">
                            <div
                              className="bg-[#0a5b58] h-full rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-12 text-right">
                            {Math.round(percentage)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-black mb-4">Reviews</h2>
                <div className="space-y-4">
                  {loadingReviews ? (
                    <p className="text-center text-gray-500 py-8">Loading reviews...</p>
                  ) : doctorReviews.length === 0 ? (
                    <div className="text-center py-3 bg-white rounded-xl">
                      <p className="text-gray-500 text-lg">No reviews yet</p>
                    </div>
                  ) : (
                    doctorReviews.map((review) => {
                      const getTimeAgo = (date) => {
                        const months = Math.floor(
                          (new Date() - new Date(date)) / (1000 * 60 * 60 * 24 * 30)
                        );
                        if (months === 0) return "This month";
                        if (months === 1) return "1 month ago";
                        return `${months} months ago`;
                      };

                      return (
                        <div key={review._id} className="p-3">
                          <div className="flex flex-col items-start">
                            <div className="flex gap-2">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0a5b58] to-[#93d8c1] flex items-center justify-center text-white font-bold flex-shrink-0">
                                {(review.patientName || "A")
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div>
                                <p className="font-bold text-lg text-gray-900">
                                  {review.patientName || "Anonymous"}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {getTimeAgo(review.date)}
                                </p>
                              </div>
                            </div>

                            <div className="w-full flex justify-between mt-2">
                              <div className="flex gap-1 text-xl">
                                {[...Array(5)].map((_, i) => (
                                  <span
                                    key={i}
                                    className={
                                      i < review.rating ? "text-[#0a5b58]" : "text-gray-300"
                                    }
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>

                              <div className="flex items-center gap-4 text-sm ml-4">
                                <button
                                  className={`flex items-center gap-1 transition-colors ${userActions[review._id] === "like"
                                    ? "text-[#0a5b58]"
                                    : "text-gray-600 hover:text-[#0a5b58]"
                                    }`}
                                  onClick={() => handleLikes(review._id)}
                                >
                                  <icons.FiThumbsUp />
                                  <span className="font-medium">{review.likes || 0}</span>
                                </button>
                                <button
                                  className={`flex items-center gap-1 transition-colors ${userActions[review._id] === "dislike"
                                    ? "text-red-600"
                                    : "text-gray-600 hover:text-red-600"
                                    }`}
                                  onClick={() => handleDisLikes(review._id)}
                                >
                                  <icons.FiThumbsDown />
                                  <span className="font-medium">{review.disLikes || 0}</span>
                                </button>
                              </div>
                            </div>

                            <p className="text-gray-700 leading-relaxed mt-2">
                              {review.feedback}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-[-15px] right-0 w-45 h-45">
          <img src={images.Appointments} alt="Illustration" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default AppointmentsModal;