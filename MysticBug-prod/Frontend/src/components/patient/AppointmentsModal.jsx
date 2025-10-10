import React, { useEffect, useState } from "react";
import { images } from "../../assets/assets";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const hours = [
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
];

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const formatDateYYYYMMDD = (d) => {
  const tzOffset = d.getTimezoneOffset() * 60000;
  const localISO = new Date(d - tzOffset).toISOString().slice(0, 10);
  return localISO;
};

const AppointmentsModal = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarStartDate, setCalendarStartDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [patientName, setPatientName] = useState("");
  const [reason, setReason] = useState("");
  const [doctor, setDoctor] = useState("");
  const [timeSlot, setTimeSlot] = useState(hours[0]);

  // loaded appointments for the week
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  // compute the week array based on selectedDate (Sunday-start)
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

  // fetch appointments for this week
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

  const appointmentMap = appointments.reduce((acc, a) => {
    const key = `${a.date}_${a.timeSlot}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(a);
    return acc;
  }, {});

  // Save appointment to backend
  const handleSave = async (e) => {
    e.preventDefault();
    // we use calendarStartDate as the date selected in form
    const dateStr = formatDateYYYYMMDD(calendarStartDate);
    if (!reason || !timeSlot) {
      alert("Please provide reason and time.");
      return;
    }

    const payload = {
      patientName,
      reason,
      doctor,
      date: dateStr,
      timeSlot,
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
      const created = await res.json();

      setAppointments((prev) => [...prev, created]);

      setPatientName("");
      setReason("");
      setDoctor("");
      setTimeSlot(hours[0]);
      setShowForm(false);

    } catch (err) {
      alert("Could not save appointment.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-[#0a5b58] rounded-xl p-4 w-full max-w-6xl h-[96vh] relative">
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
            {/* Header row - empty top-left cell */}
            <div className="border border-green-800 bg-[#93d8c1]"></div>

            {/* day headers */}
            {weekDates.map((date, idx) => (
              <div
                key={`head-${idx}`}
                className="border border-green-800 py-6 bg-[#93d8c1] text-green-900 text-center"
              >
                <div className="text-xs">{days[date.getDay()]}</div>
                <div className="text-sm font-semibold">{date.getDate()}</div>
              </div>
            ))}

            {/* Rows for hours */}
            {hours.map((hour, i) => (
              // For each row we first render the hour cell then the 7 day-cells
              <React.Fragment key={`row-${i}`}>
                {/* Hour cell */}
                <div
                  className="border border-green-800 py-2 text-xs bg-[#93d8c1] text-center"
                  key={`hour-${i}`}
                >
                  {hour}
                </div>

                {/* Day cells for this hour */}
                {weekDates.map((date, j) => {
                  const dateKey = formatDateYYYYMMDD(date);
                  const cellKey = `${dateKey}_${hour}`;
                  const cellAppointments = appointmentMap[cellKey] || [];

                  const isToday = dateKey === formatDateYYYYMMDD(new Date());

                  return (
                    <div
                      key={`cell-${i}-${j}`}
                      className={`border border-green-800 py-2 px-1 text-center ${isToday ? "bg-green-900 text-white" : "bg-[#93d8c1]"}`}
                      style={{ minHeight: 48 }}
                    >
                      {/* render appointment(s) for this slot */}
                      {cellAppointments.length === 0 ? (
                        <div className="h-full w-full">&nbsp;</div>
                      ) : (
                        <div className="flex flex-col gap-1 items-start">
                          {cellAppointments.map((a) => (
                            <div key={a._id} className="w-full text-left rounded px-1 py-0.5 bg-white text-green-900 text-xs">
                              <div className="font-semibold truncate">{a.patientName || 'Patient'}</div>
                              <div className="truncate">{a.reason}</div>
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
            <form className="flex flex-col mt-2 gap-2" onSubmit={handleSave}>
              <label className="text-xs">PATIENT NAME</label>
              <input
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                type="text"
                id="name"
                className="p-1 rounded bg-[#8ccdb8] outline-none text-sm"
                placeholder="Name (optional)"
              />

              <label className="text-xs">REASON</label>
              <input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                type="text"
                id="reason"
                className="p-1 rounded bg-[#8ccdb8] outline-none text-sm"
                placeholder="e.g. Fever, Follow-up"
                required
              />

              <label className="text-xs">DATE</label>
              <DatePicker
                selected={calendarStartDate}
                onChange={(date) => setCalendarStartDate(date)}
                dateFormat={"dd/MM/yyyy"}
                minDate={new Date()}
                className="w-full p-1 rounded bg-[#8ccdb8] outline-none text-sm"
              />

              <label className="text-xs">TIME</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="p-1 rounded bg-[#8ccdb8] outline-none text-sm"
              >
                {hours.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>

              <label className="text-xs">DOCTOR</label>
              <input
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                type="text"
                id="doctor"
                className="p-1 rounded bg-[#8ccdb8] mb-2 outline-none text-sm"
                placeholder="Doctor name (optional)"
              />

              <button
                type="submit"
                className="rounded bg-[#0a4f5b] py-2 text-white"
                disabled={loading}
              >
                {loading ? "Saving..." : "SAVE DETAILS"}
              </button>
            </form>
          </div>
        )}

        <div className="absolute bottom-[-15px] right-0 w-45 h-45">
          <img
            src={images.Appointments}
            alt="Illustration"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentsModal;
