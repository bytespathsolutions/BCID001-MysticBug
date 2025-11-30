import { useEffect, useState } from 'react';
import { default_page_images, images } from '../../assets/assets';
import { useAuth } from '../../Context/AuthContext';

const Overview = () => {
  const [patients, setPatients] = useState(null)
  const [taskCount, setTaskCount] = useState(0)
  const { user, uid } = useAuth();
  let doctorName = user;
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const today = new Date();
  const todayDate = today.toISOString().split('T')[0] //keep as it is

  let hours = today.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const currentHourSlot = `${hours} ${ampm}`;

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${BASE_URL}/appointments/${doctorName}`)
        const data = await response.json();
        setPatients(data.patients)
      } catch (error) {
        console.log("error while fetching patient records")
      }
    }
    if (doctorName) fetchPatients();
  }, [doctorName, BASE_URL])
  useEffect(() => {
    const fetchTaskCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tasks/${uid}`)
        const data = await response.json();
        setTaskCount(data.tasks.length)
      } catch (error) {
        console.log("error while fetching task count records")
      }
    }
    fetchTaskCount();
  }, [BASE_URL, uid])

  const filteredTodayPatients = patients?.filter((p) => new Date(p.date).toISOString().split('T')[0] === todayDate).length || 0;
  const filteredUpcomingAppointments = patients?.filter((p) => new Date(p.date).toISOString().split('T')[0] >= todayDate && p.timeSlot > currentHourSlot && p.status === 'confirmed').length || 0;

  const upcomingCancelledAppointments = patients?.filter((p) => new Date(p.date).toISOString().split('T')[0] === todayDate && p.timeSlot >= currentHourSlot && p.status === "rejected").length || 0;

  return (
    <div className="bg-[#f3e8d1] min-h-screen px-8 relative overflow-hidden">
      <div className="mb-6">
        <h1 className="text-4xl font-bold font-lato mb-2" >
          Welcome back, Dr.{user}
        </h1>
        <p className="text-base font-semibold">
          Here's an overview of your day.
        </p>
      </div>

      <div className="max-w-5xl space-y-6 mb-20">
        <div>
          <h2 className="text-2xl font-bold mb-3" >
            Patient Management
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="font-bold text-sm mb-1">Active Patients</p>
              <h1 className="font-extrabold mb-2">{patients?.length || 0}</h1>
              <p className="text-sm font-semibold">Patients currently under your care.</p>
            </div>
            <div>
              <p className="font-bold text-sm mb-1">New Patients Today</p>
              <h1 className="font-extrabold mb-2">{filteredTodayPatients || 0}</h1>
              <p className="text-sm font-semibold">New patients added to your caseload today.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3" >
            Appointment Management
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="font-bold text-sm mb-1">Upcoming Appointments</p>
              <h1 className="font-extrabold mb-2">{filteredUpcomingAppointments || 0}</h1>
              <p className="text-sm font-semibold">Appointments scheduled for today.</p>
            </div>
            <div>
              <p className="font-bold text-sm mb-1">Cancellations</p>
              <h1 className="font-extrabold mb-2">{upcomingCancelledAppointments || 0}</h1>
              <p className="text-sm font-semibold">Appointments cancelled today.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6">
          <div>
            <h2 className="text-2xl font-bold mb-3" >
              Communication Hub
            </h2>
            <div>
              <p className="font-bold text-sm mb-1">Unread Messages</p>
              <h1 className="font-extrabold mb-2">0</h1>
              <p className="text-sm font-semibold">New messages from patients and staff.</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3" >
              Calendar & Scheduling
            </h2>
            <div>
              <p className="font-bold text-sm mb-1">Available Slots Today</p>
              <h1 className="font-extrabold mb-2">0</h1>
              <p className="text-sm font-semibold">Open slots for new appointments.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3" >
            Task and Workflow Manager
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="font-bold text-sm mb-1">Pending Tasks</p>
              <h1 className="font-extrabold mb-2">{taskCount}</h1>
              <p className="text-sm font-semibold">Tasks Awaiting Completion</p>
            </div>
            <div>
              <p className="font-bold text-sm mb-1">Cancellations</p>
              <h1 className="font-extrabold mb-2">{upcomingCancelledAppointments}</h1>
              <p className="text-sm font-semibold">Appointments cancelled today.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:fixed bottom-0 right-0 w-full pointer-events-none">
        <div className="relative h-44">
          <img
            className='absolute right-[-6px] w-[1180px]'
            src={default_page_images.clip_path_group} alt="clip_path_group" />

          <div className="absolute bottom-0 right-6 w-64 h-64 flex items-end justify-center">
            <div className="relative">
              <div className="relative z-6 flex items-end space-x-4">
                <img src={images.Doctor} alt="Doctor" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;