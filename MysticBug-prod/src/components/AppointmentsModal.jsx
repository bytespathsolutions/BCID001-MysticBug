import { useState } from "react";
import { images } from "../assets/assets";

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

const AppointmentsModal = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarStartDate, setCalendarStartDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
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
              gridTemplateColumns: `80px repeat(${showForm ? 7 : 7}, 1fr)`,
            }}
          >
            {/* Header row */}
            <div className="border border-green-800 bg-[#93d8c1]"></div>
            {(showForm ? weekDates.slice(0, 7) : weekDates).map((date, idx) => (
              <div
                key={idx}
                className="border border-green-800 py-6 bg-[#93d8c1] text-green-900 text-center"
              >
                <div className="text-xs">{days[idx]}</div>
                <div className="text-sm font-semibold">{date.getDate()}</div>
              </div>
            ))}

            {/* Rows for hours */}
            {hours.map((hour, i) => (
              <>
                {/* Hour cell */}
                <div
                  key={`hour-${i}`}
                  className="border border-green-800 py-2 text-xs bg-[#93d8c1] text-center"
                >
                  {hour}
                </div>

                {/* Day cells */}
                {(showForm ? weekDates.slice(0, 7) : weekDates).map((_, j) => (
                  <div
                    key={`cell-${i}-${j}`}
                    className={`border border-green-800 py-2 text-center ${j === selectedDate.getDay()
                      ? "bg-green-900 text-white"
                      : "bg-[#93d8c1]"
                      }`}
                  >
                    1
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>

        {/* Form in the last column space */}
        {showForm && (
          <div className="absolute top-[68px] right-0 w-[190px] bg-[#93d8c1] p-4 rounded-lg h-[74.7vh]">
            <button
              onClick={() => setShowForm(false)}
              className="text-black font-lato text-4xl hover:text-gray-600 cursor-pointer"
            >
              &times;
            </button>
            <h2 className="text-center text-2xl font-merriweather">
              Book <br /> Appointment
            </h2>
            <form className="flex flex-col mt-2">
              <label htmlFor="name">PATIENT NAME</label>
              <input type="text" id="name" className="p-1 rounded bg-[#8ccdb8] outline-none" />

              <label htmlFor="reason">REASON</label>
              <input type="text" id="reason" className="p-1 rounded bg-[#8ccdb8] outline-none" />

              {/* set the faclendar icon in datepicker which open the datepicker */}

              <label htmlFor="date">DATE</label>
              <DatePicker
                selected={calendarStartDate}
                onChange={(date) => setCalendarStartDate(date)}
                dateFormat={"dd/MM/yyyy"}
                className="w-full p-1 rounded bg-[#8ccdb8] outline-none" />

              <label>TIME</label>
              <div className="flex gap-2">
                <input type="text" className="w-[50px] p-1 bg-[#8ccdb8] outline-none" />
                <input type="text" className="w-[50px] p-1 bg-[#8ccdb8] outline-none" />
                <select className="p-1 rounded bg-[#8ccdb8] outline-none">
                  <option value="am">AM</option>
                  <option value="pm">PM</option>
                </select>
              </div>

              <label htmlFor="doctor">DOCTOR</label>
              <input
                type="text"
                id="doctor"
                className="p-1 rounded bg-[#8ccdb8] mb-2 outline-none"
              />

              <button className="rounded bg-[#0a4f5b] py-2 text-white">
                SAVE DETAILS
              </button>
            </form>
          </div>
        )}

        <div className="absolute bottom-0 right-0 w-45 h-45">
          <img
            src={images.Appointments}
            alt="Illustration"
            className="w-full h-full"
          />
        </div>
      </div>
    </div >
  );
};

export default AppointmentsModal;
