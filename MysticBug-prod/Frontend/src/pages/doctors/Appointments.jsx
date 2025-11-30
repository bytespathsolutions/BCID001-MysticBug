import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";

import "react-datepicker/dist/react-datepicker.css";

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
  const { uid, userName, loading } = useAuth();

  const [patientName, setPatientName] = useState('')
  const [reason, setReason] = useState('')
  const [calendarSelectDate, setCalendarSelectedDate] = useState(new Date())
  const [timeSlot, setTimeSlot] = useState('')
  // loaded appointments for the week
  const [appointments, setAppointments] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // fetch Patients of current doctor
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch(`${BASE_URL}/doctors/${uid}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch patients");
        setPatientsList(data.patients || []);
      } catch (err) {
        console.error("Error fetching patients:", err.message);
      }
    };
    fetchPatients();
  }, [BASE_URL, uid]);

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

  const getAvailableHours = () => {
    if (isToday(calendarSelectDate)) {
      const currentHour = new Date().getHours();
      return hours.filter((time) => to24Hour(time) > currentHour);
    }
    return hours;
  };

  const availableHours = getAvailableHours();

  useEffect(() => {
    if (availableHours.length > 0 && !timeSlot) {
      setTimeSlot(availableHours[0]);
    }
  }, [availableHours]);

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

  // Fetch the logged-in doctor's name first
  useEffect(() => {
    const fetchDoctorName = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users/${uid}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const userData = await res.json();
        setDoctorName(userData.name);
      } catch (err) {
        console.error("Failed to fetch doctor name:", err);
      }
    };
    if (uid) {
      fetchDoctorName();
    }
  }, [uid]);

  // Fetch appointments for this week
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!userName) {
        console.log("Waiting for userName to load...");
        return;
      }
      try {
        const start = formatDateYYYYMMDD(weekDates[0]);
        const end = formatDateYYYYMMDD(weekDates[6]);
        const res = await fetch(`${BASE_URL}/appointments?start=${start}&end=${end}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const filteredData = data.filter((app) => app.doctor === userName && isToday(new Date(app.date)))

        setAppointments(filteredData);
      } catch (err) {
        console.error("fetchAppointments error:", err);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, [selectedDate, userName]);

  const acceptedAppointments = appointments.filter((app) => app.status === 'confirmed');
  const appointmentMap = acceptedAppointments.reduce((acc, a) => {
    const appointmentDate = new Date(a.date);
    const dateKey = formatDateYYYYMMDD(appointmentDate);
    const key = `${dateKey}_${a.timeSlot}`;

    if (!acc[key]) acc[key] = [];
    acc[key].push(a);
    return acc;
  }, {});

  const handleAcceptClick = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/appointments/${id}/accept`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      setAppointments(prev =>
        prev.map(apt =>
          apt._id === id ? { ...apt, status: 'confirmed' } : apt
        )
      );
    } catch (error) {
      console.log("error while accepting appointment:", error)
    }
  }

  const handleRejectClick = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/appointments/${id}/reject`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error("Failed to reject appointment");
      }

      const data = await response.json();

      setAppointments(prev =>
        prev.map(apt =>
          apt._id === id ? { ...apt, status: 'rejected' } : apt
        )
      );
    } catch (error) {
      console.log("error while rejecting appointment:", error);
      alert("Failed to reject appointment");
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();

    if (!patientName || !reason || !calendarSelectDate || !timeSlot) {
      alert("Please fill all fields");
      return;
    }

    try {
      const appointmentData = {
        patientName,
        doctor: userName,
        date: formatDateYYYYMMDD(calendarSelectDate),
        timeSlot,
        reason,
      };

      const response = await fetch(`${BASE_URL}/appointments`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
      });

      if (!response.ok) throw new Error("Failed to create appointment");

      const newAppointment = await response.json();
      // Add the new appointment to local state
      setAppointments(prev => [...prev, newAppointment]);

      // Reset form
      setPatientName('');
      setReason('');
      setCalendarSelectedDate(new Date());
      setTimeSlot(availableHours[0] || '');
      setShowForm(false);
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Failed to create appointment");
    }
  }

  return (
    <div className="bg-[#f3e8d1] flex justify-start z-50">
      <div className="bg-[#f3e8d1] rounded-xl p-4 w-full max-w-5xl h-[96vh] relative overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-lato font-bold">Appointments</h2>
        </div>

        <div className="flex flex-col border border-black rounded-2xl overflow-hidden h-[70vh] bg-[#f3e8d1]">
          <div
            className="grid border-b border-black"
            style={{
              gridTemplateColumns: `80px repeat(${7}, 1fr)`,
            }}
          >
            <div className="border-r border-black bg-[#f3e8d1]"></div>
            {weekDates.map((date, idx) => (
              <div
                key={`head-${idx}`}
                className={`border-black py-2 bg-[#f3e8d1] text-black text-center sticky top-0 z-10 ${idx < 6 ? 'border-r' : ''
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
                  className={`border-r border-black py-2 text-xs bg-[#f3e8d1] text-center sticky left-0 z-10 ${i < hours.length - 1 ? 'border-b' : ''
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
                      className={`py-2 px-1 text-center ${isTodayCell ? "bg-[#fff6d8]" : "bg-[#f3e8d1]"
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
        <table className="w-full mt-4 mb-10 text-center border-collapse bg-[#fdbc23] rounded-2xl overflow-hidden">
          <thead>
            <tr className="text-center bg-[#f1b91f]">
              <th className="px-4 py-3 font-semibold text-gray-800">Patient</th>
              <th className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">Date / Time</th>
              <th className="px-4 py-3 font-semibold text-gray-800">Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment, index) => (
              <tr
                key={appointment._id || appointment.name + index}
                className="bg-[#f6e2ac]"
              >
                <td className="px-4 py-3 text-gray-900">{appointment.patientName}</td>
                <td className="px-4 py-3 text-gray-900 ">
                  {new Date(appointment.date).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}, {appointment.timeSlot}
                </td>
                <td className="py-3 flex gap-4 justify-center">
                  <button
                    className={`px-5 py-1 rounded-2xl transition-colors ${appointment.status === 'confirmed'
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : appointment.status === 'rejected'
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-[#f1b91f] hover:bg-[#e0a810] cursor-pointer'
                      }`}
                    onClick={() => handleAcceptClick(appointment._id)}
                    disabled={appointment.status === 'confirmed' || appointment.status === 'rejected'}
                  >
                    {appointment.status === "confirmed" ? "Accepted" : "Accept"}
                  </button>
                  <button
                    className={`px-5 py-1 rounded-2xl transition-colors ${appointment.status === 'rejected'
                      ? 'bg-red-500 text-white cursor-not-allowed'
                      : appointment.status === 'confirmed'
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-[#f1b91f] hover:bg-[#e0a810] cursor-pointer'
                      }`}
                    onClick={() => handleRejectClick(appointment._id)}
                    disabled={appointment.status === 'confirmed' || appointment.status === 'rejected'}
                  >
                    {appointment.status === "rejected" ? "Rejected" : "Reject"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Appointments;