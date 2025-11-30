import { useEffect, useState } from "react";
import { icons } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [taskModel, setTaskModel] = useState(false);
  const [selected, setSelected] = useState([]);
  const [task, setTask] = useState([]);
  const [description, setDescription] = useState([]);
  const [urgency, setUrgency] = useState([]);
  const { user, uid } = useAuth();
  const location = useLocation();
  const path = location?.pathname;
  const sections = [
    { name: "Overview", icon: <icons.GoHome size={24} /> },
    { name: "Patients", icon: <icons.PiUsers size={24} /> },
    { name: "Appointments", icon: <icons.PiCalendarBold size={24} /> },
    { name: "Record", icon: <icons.AiOutlineFile size={24} /> },
    { name: "Messages", icon: <icons.AiTwotoneMessage size={24} /> },
    { name: "Tasks", icon: <icons.RiTaskLine size={24} /> },
  ];
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  const handleTaskForm = async (selectedUrgency) => {
    if (!task || !description) {
      alert("Please fill in all fields");
      return;
    }

    let payload = {
      task,
      description,
      urgency: selectedUrgency
    };
    try {
      const response = await fetch(`${BASE_URL}/tasks/${uid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Task added successfully");
        setTaskModel(false);
        // Reset form
        setTask("");
        setDescription("");
        setUrgency("");
      }
    } catch (error) {
      console.log("Error while adding task:", error);
    }
  };
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-[110px] left-4 z-50 bg-[#F4C430] text-[#0D1A1C] p-2 rounded-md shadow-md"
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
        className={`fixed top-[101px] left-0 h-[calc(100vh-101px)] bg-[#f3e8d1] 
          w-[260px] flex flex-col justify-between p-0 z-50
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0 mt-[-21px]" : "-translate-x-full"} 
          md:translate-x-0 md:w-[288px]
        `}
      >
        <div>
          <div className="flex items-center gap-2 px-6 py-1">
            <img
              src=""
              alt=""
              className="w-10 h-10 rounded-full bg-gray-300"
            />
            <div>
              <h1 className="font-lato font-medium text-[#0D1A1C]">
                {user}
              </h1>
              <p className="text-[#4F8C96] font-lato font-normal text-sm">
                field
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-4">
            <NavLink
              to="overview"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-[#F4C430] text-[#0D1A1C]"
                  : "text-[#0D1A1C] hover:text-[#4F8C96]"
                }`
              }
              onClick={() => setOpen(false)} // close on click (mobile)
            >
              <icons.GoHomeFill size={24} />
              <span>Overview</span>
            </NavLink>

            <NavLink
              to="patients"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-[#F4C430] text-[#0D1A1C]"
                  : "text-[#0D1A1C] hover:text-[#4F8C96]"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <icons.PiUsers size={24} />
              <span>Patients</span>
            </NavLink>

            <NavLink
              to="appointments"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-[#F4C430] text-[#0D1A1C]"
                  : "text-[#0D1A1C] hover:text-[#4F8C96]"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <icons.PiCalendarBold size={24} />
              <span>Appointments</span>
            </NavLink>
            <NavLink
              to="doctor/messages"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-[#F4C430] text-[#0D1A1C]"
                  : "text-[#0D1A1C] hover:text-[#4F8C96]"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <icons.PiCalendarBold size={24} />
              <span>Messages</span>
            </NavLink>

            <NavLink
              to="tasks"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive
                  ? "bg-[#F4C430] text-[#0D1A1C]"
                  : "text-[#0D1A1C] hover:text-[#4F8C96]"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <icons.RiTaskLine size={24} />
              <span>Tasks</span>
            </NavLink>
          </div>
        </div>

        {path === "/doctor-dashboard" || path === "/doctor-dashboard/overview" && <div className="p-4">
          <div
            className="flex items-center gap-6 px-3 py-2 rounded-md transition-colors bg-[#fdbc23] text-[#0D1A1C]"
            onClick={() => { setOpen(false); setModal(true) }}
          >
            <icons.FaStar size={24} />
            <span>Favorites</span>
          </div>
        </div>}
        {path === "/doctor-dashboard/tasks" && <div className="p-4">
          <div>
            <button className="p-1 w-full rounded-2xl transition-colors bg-[#fdbc23] text-[#0D1A1C]" onClick={() => setTaskModel(true)}>Add Task</button>
          </div>
        </div>}
      </div>

      {taskModel && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="relative bg-[#fdbc23] w-[700px] rounded-md p-6 shadow-2xl">
            <button
              onClick={() => setTaskModel(false)}
              className="absolute top-4 right-4 text-3xl font-bold text-black hover:scale-110"
            >
              ×
            </button>
            <h1 className="font-bold text-2xl text-center mb-6">
              Add Task
            </h1>
            <label className="font-semibold">Task Name</label>
            <input
              type="text"
              className="block w-[90%] rounded-md p-2 mt-1 mb-4 outline-none"
              placeholder="Enter task name..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <label className="font-semibold">Description</label>
            <input
              type="text"
              className="block w-[90%] rounded-md p-2 mt-1 mb-4 outline-none"
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="font-semibold">Task Urgency</label>
            <div className="w-[90%] flex justify-between bg-white px-5 rounded-md py-1 gap-4 mt-2">
              <button
                type="button"
                onClick={() => handleTaskForm("Incomplete")}
                className="bg-red-600 text-white font-merriweather text-lg font-semibold rounded-md w-full py-2 hover:opacity-90"
              >
                Incomplete
              </button>
              <button
                type="button"
                onClick={() => handleTaskForm("Urgent")}
                className="bg-yellow-300 text-black font-merriweather text-lg font-semibold rounded-md w-full py-2 hover:opacity-90"
              >
                Urgent
              </button>
              <button
                type="button"
                onClick={() => handleTaskForm("Complete")}
                className="bg-green-600 text-white font-merriweather text-lg font-semibold rounded-md w-full py-2 hover:opacity-90"
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      )}

      {
        modal && (
          <div className="flex justify-center items-center h-screen fixed inset-0 bg-black/40 z-50">
            <div className="bg-[#f6e2ac] h-[360px] w-[400px] border ">
              <div className="flex items-center justify-between p-4">
                <div>
                  <h1 className="font-bold text-xl">Favorites</h1>
                  <p>Choose your favorite sections (upto 2)</p>
                </div>
                <div>
                  <span
                    className="cursor-pointer hover:text-red-500" onClick={() => setModal(false)}><icons.MdClose size={28} /></span>
                </div>

              </div>
              <div className="max-w-[300px] mx-auto flex flex-col space-y-5 mt-5">
                {sections.map((section) => (
                  <div
                    key={section.name}
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleFavorite(section.name)}
                  >
                    <div className="flex gap-2 items-center">
                      {section.icon}
                      <span>{section.name}</span>
                    </div>
                    {selected.includes(section.name) ? (
                      <icons.FaStar className="text-yellow-500" size={24} />
                    ) : (
                      <icons.CiStar size={24} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default Sidebar;
