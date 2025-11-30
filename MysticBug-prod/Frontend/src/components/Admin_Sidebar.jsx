import { useState } from "react";
import { icons } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Admin_Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-[110px] left-4 z-50 bg-[#d1eaf3] text-[#0D1A1C] p-2 rounded-md shadow-md"
      >
        <icons.FaArrowRight size={24} />
      </button>

      {/* Backdrop (visible when menu open on mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-[101px] left-0 h-[calc(100vh-101px)] bg-[#d1eaf3] 
           w-[260px] flex flex-col justify-between p-0 z-50
           transform transition-transform duration-300 ease-in-out 
           ${open ? "translate-x-0 mt-[-21px]" : "-translate-x-full"} 
           md:translate-x-0 md:w-[288px]
        `}
      >
        <div>
          <div className="flex items-center gap-2 px-6 py-1">
            <img
              src={null}
              alt=""
              className="w-10 h-10 rounded-full bg-gray-300"
            />
            <div>
              <h1 className="font-lato font-medium text-[#0D1A1C]">
                {user}
              </h1>
              <p className="text-[#111] font-lato font-normal text-sm">
                field
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 p-4">
            <NavLink
              end
              to="dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-[#acd8f6] text-[#0D1A1C]"
                  : "text-[#0D1A1C] hover:bg-[#acd8f6]"
                }`
              }
              onClick={() => setOpen(false)} // close on click (mobile)
            >
              <icons.GoHomeFill size={24} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="users"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-[#acd8f6] text-[#0D1A1C]"
                  : "text-[#0D1A1C] hover:bg-[#acd8f6]"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <icons.PiUsers size={24} />
              <span>Users</span>
            </NavLink>

            <NavLink
              to="doctors"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-[#acd8f6] text-[#0D1A1C]"
                  : "text-[#0D1A1C] hover:bg-[#acd8f6]"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <icons.FaUserDoctor size={24} />
              <span>Doctors</span>
            </NavLink>
            <NavLink
              to="investors"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-[#acd8f6] text-[#0D1A1C]"
                  : "text-[#0D1A1C] hover:bg-[#acd8f6]"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <icons.RiTaskLine size={24} />
              <span>Investors</span>
            </NavLink>
            <NavLink
              to="patientList"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-[#acd8f6] text-[#0D1A1C]"
                  : "text-[#0D1A1C] hover:bg-[#acd8f6]"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <icons.RiTaskLine size={24} />
              <span>Patients</span>
            </NavLink>
            <NavLink
              to="appointments"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-[#acd8f6] text-[#0D1A1C]"
                  : "text-[#0D1A1C] hover:bg-[#acd8f6]"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <icons.PiCalendarBold size={24} />
              <span>Appointments</span>
            </NavLink>
            <NavLink
              to="medical_histories"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-[#acd8f6] text-[#0D1A1C]"
                  : "text-[#0D1A1C] hover:bg-[#acd8f6]"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <icons.AiOutlineFile size={24} />
              <span>Medical Histories</span>
            </NavLink>
            <NavLink
              to="payments"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-[#acd8f6] text-[#0D1A1C]"
                  : "text-[#0D1A1C] hover:bg-[#acd8f6]"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <icons.MdPayments size={24} />
              <span>Payments</span>
            </NavLink>
            <NavLink
              to="chatbot_logs"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-[#acd8f6] text-[#0D1A1C]"
                  : "text-[#0D1A1C] hover:bg-[#acd8f6]"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <icons.LuMessageCircleMore size={24} />
              <span>Chatbot Logs</span>
            </NavLink>
            <NavLink
              to="notifications"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-[#acd8f6] text-[#0D1A1C]"
                  : "text-[#0D1A1C] hover:bg-[#acd8f6]"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <icons.RiTaskLine size={24} />
              <span>Notifications</span>
            </NavLink>

            <NavLink
              to="system_settings"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-[#acd8f6] text-[#0D1A1C]"
                  : "text-[#0D1A1C] hover:bg-[#acd8f6]"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <icons.HiOutlineCog6Tooth size={24} />
              <span>System Settings</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Sidebar;
