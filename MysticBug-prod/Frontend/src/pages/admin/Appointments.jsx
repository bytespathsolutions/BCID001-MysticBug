import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "./Loader";

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

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarStartDate, setCalendarStartDate] = useState(new Date());
  const [doctorName, setDoctorName] = useState("");
  const [patientsList, setPatientsList] = useState([]);
  const { uid, loading } = useAuth();

  // form state
  const [showForm, setShowForm] = useState(false)
  const [openPatientsList, setOpenPatientsList] = useState(false)
  const [patientName, setPatientName] = useState('')
  const [reason, setReason] = useState('')
  const [calendarSelectDate, setCalendarSelectedDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  // loaded appointments for the week
  const [appointments, setAppointments] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // fetch Patients of current doctor

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

  // Determine available hours based on selected date
  const getAvailableHours = () => {
    if (isToday(calendarStartDate)) {
      const currentHour = new Date().getHours();
      return hours.filter((time) => to24Hour(time) > currentHour);
    }
    return hours;
  };

  const availableHours = getAvailableHours();

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
        const start = formatDateYYYYMMDD(weekDates[0]);
        const end = formatDateYYYYMMDD(weekDates[6]);
        const res = await fetch(`${BASE_URL}/appointments?start=${start}&end=${end}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        // Filter appointments to show only upcoming ones
        const now = new Date();
        const currentHour = now.getHours();
        const filteredDataInTimeRange = data.filter((app) => {
          const appDate = new Date(app.date);
          const appointmentDateIsToday = isToday(appDate);
          const appHour = to24Hour(app.timeSlot);

          // Set both dates to start of day for comparison
          const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const appDateStart = new Date(appDate.getFullYear(), appDate.getMonth(), appDate.getDate());

          // If appointment date is before today, exclude it
          if (appDateStart < todayStart) {
            return false;
          }

          // If appointment is today, only show if time is in the future
          // if (appointmentDateIsToday) {
          //   return appHour > currentHour;
          // }

          // If appointment is in the future, include it
          return true;
        });
        setAppointments(filteredDataInTimeRange);
      } catch (err) {
        console.error("fetchAppointments error:", err);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, [selectedDate]);

  const acceptedAppointmets = appointments.filter((app) => app.status === 'confirmed');
  const appointmentMap = acceptedAppointmets.reduce((acc, a) => {
    const appointmentDate = new Date(a.date);
    const dateKey = formatDateYYYYMMDD(appointmentDate);
    const key = `${dateKey}_${a.timeSlot}`;

    if (!acc[key]) acc[key] = [];
    acc[key].push(a);
    return acc;
  }, {});

  return (
    <div className="bg-[#d1e8f3] min-h-screen p-6">
      <div className="bg-[#d1e8f3] rounded-xl p-4 w-full max-w-5xl min-h-screen relative overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className='text-3xl font-bold text-gray-800'>Appointments</h2>
          {/* <h2 className="text-md px-3 py-1 rounded-2xl bg-[#acd8f6]" onClick={() => setShowForm(true)}>New Appointments</h2> */}
        </div>

        <div className="flex flex-col border border-black rounded-2xl overflow-hidden h-[65vh] bg-[#d1e8f3]">
          <div
            className="grid border-b border-black"
            style={{
              gridTemplateColumns: `80px repeat(${7}, 1fr)`,
            }}
          >
            <div className="border-r border-black bg-[#d1e8f3]"></div>
            {weekDates.map((date, idx) => (
              <div
                key={`head-${idx}`}
                className={`border-black py-2 bg-[#d1e8f3] text-black text-center sticky top-0 z-10 ${idx < 6 ? 'border-r' : ''
                  }`}
              >
                <div className="text-xs">{days[date.getDay()]}</div>
                <div className="text-sm font-semibold">{date.getDate()}</div>
              </div>
            ))}
          </div>

          <div
            className="grid flex-1 overflow-y-auto"
            style={{
              gridTemplateColumns: `80px repeat(${7}, 1fr)`,
            }}
          >
            {hours.map((hour, i) => (
              <React.Fragment key={`row-${i}`}>
                <div
                  className={`border-r border-black py-2 text-xs bg-[#d1e8f3] text-center sticky left-0 z-10 ${i < hours.length - 1 ? 'border-b' : ''
                    }`}
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
                      className={`py-2 px-1 text-center ${isTodayCell ? "bg-[#acd8f6]" : "bg-[#d1e8f3]"
                        } ${j < 6 ? 'border-r border-black' : ''} ${i < hours.length - 1 ? 'border-b border-black' : ''
                        }`}
                      style={{ minHeight: 48 }}
                    >
                      {cellAppointments.length === 0 ? (
                        <div className="h-full w-full">&nbsp;</div>
                      ) : (
                        <div className="flex flex-col gap-1 items-start">
                          {cellAppointments.map((a) => (
                            <div
                              key={a._id}
                              className="w-full text-left rounded px-1 py-0.5 bg-green-100 border border-green-400 text-black text-xs"
                            >
                              <div className="font-semibold truncate">
                                {a.patientName}
                              </div>
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
        <h2 className="text-2xl font-lato font-bold mt-4">Appointments</h2>
        <div className="rounded-lg mt-4 overflow-y-auto max-h-[68vh]">
          <table className="bg-[#f7fafc] w-full">
            <thead>
              <tr className="text-center font-semibold bg-gray-100">
                <th className="px-4 py-3">Appointment ID</th>
                <th className="px-4 py-3">Date/Time</th>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? <tr> <td colSpan="6" className='py-6'><Loader /></td> </tr> : appointments.length > 0 ? appointments.map((data, index) => (
                <tr className="text-center" key={data._id}>
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{new Date(data.date).toLocaleDateString('en-GB', {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })} - {data.timeSlot}</td>
                  <td className="px-4 py-3">{data.doctor}</td>
                  <td className="px-4 py-3">{data.patientName}</td>
                  <td className="px-4 py-3">
                    <button className="bg-[#e8edf2] rounded px-6 py-1 shadow">
                      {data.status}
                    </button>
                  </td>
                </tr>
              )) : <tr className='text-center font-semibold text-red-500'>
                <td
                  colSpan="6" className="py-4">
                  No data available
                </td>
              </tr>
              }
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Appointments;