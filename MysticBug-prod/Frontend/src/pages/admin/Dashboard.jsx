import { useState } from 'react';
import { useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const appointmentsData = [
    { day: 'Mon', value: 20 },
    { day: 'Tue', value: 35 },
    { day: 'Wed', value: 25 },
    { day: 'Thu', value: 40 },
    { day: 'Fri', value: 30 },
    { day: 'Sat', value: 45 },
    { day: 'Sun', value: 35 }
  ];

  const trafficData = [
    { month: 'Mar', value: 30 },
    { month: 'Apr', value: 35 },
    { month: 'May', value: 25 },
    { month: 'Jun', value: 40 },
    { month: 'Jul', value: 35 },
    { month: 'Aug', value: 50 },
    { month: 'Sep', value: 40 }
  ];

  const paymentData = [
    { status: 'Success', value: 95 },
    { status: 'Failed', value: 60 },
    { status: 'Pending', value: 85 }
  ];

  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  const [totalPatientsCount, setTotalPatientsCount] = useState(0)
  const [totalDoctorsCount, setTotalDoctorsCount] = useState(0)
  const [totalUsersCount, setTotalUsersCount] = useState(0)
  const [activeDoctors, setActiveDoctors] = useState(0)
  const [activePatients, setActivePatients] = useState(0)
  const [activeInvestor, setActiveInvestor] = useState(0)
  const [todaysAppointment, setTodaysAppointment] = useState(0)
  const [activeSessionsCount, setActiveSessionsCount] = useState(0)
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get_count`)
        const data = await response.json();
        setTotalDoctorsCount(data.doctorCount)
        setTotalPatientsCount(data.patientCount)
        setTotalUsersCount(data.totalCount)
        setActiveDoctors(data.activeDoctors)
        setActivePatients(data.activePatients)
        setActiveInvestor(data.activeInvestor)
      } catch (error) {
        console.log("error while getting count", error.message)
      }
    }
    fetchCount();
    const fetchAppointmentCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}/appointments/today_appointments_count`)
        const todaysAppointmentData = await response.json()
        setTodaysAppointment(todaysAppointmentData.todaysAppointment)
      } catch (error) {
        console.log("error while getting todays appointment")
      }
    }
    fetchAppointmentCount()
  }, [])

  useEffect(() => {
    const fetchActiveSessionsCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/active-status`)
        const activeSessionsCount = await response.json()
        setActiveSessionsCount(activeSessionsCount.activeUsers)
      } catch (error) {
        console.log("error while getting active users status")
      }
    }
    fetchActiveSessionsCount()
  }, [])
  return (
    <div className='bg-[#d1e8f3] min-h-screen p-8'>
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>Dashboard</h1>

      <h2 className='text-lg font-semibold mb-4 text-gray-700'>Widgets / Cards</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 mb-4'>
        <div className='rounded-lg border-2 border-blue-400 p-4'>
          <p className='text-sm text-gray-600 mb-2'>Total Users</p>
          <p className='text-2xl font-bold text-gray-800'>{totalUsersCount || 0}</p>
        </div>
        <div className='rounded-lg border-2 border-blue-400 p-4'>
          <p className='text-sm text-gray-600 mb-2'>Total Doctors</p>
          <p className='text-2xl font-bold text-gray-800'>{totalDoctorsCount || 0}</p>
        </div>
        <div className='rounded-lg border-2 border-blue-400 p-4'>
          <p className='text-sm text-gray-600 mb-2'>Appointments Today</p>
          <p className='text-2xl font-bold text-gray-800'>{todaysAppointment || 0}</p>
        </div>
        <div className='rounded-lg border-2 border-blue-400 p-4'>
          <p className='text-sm text-gray-600 mb-2'>Active Sessions</p>
          <p className='text-2xl font-bold text-gray-800'>{activeSessionsCount || 0}</p>
        </div>
        <div className='rounded-lg border-2 border-blue-400 p-4'>
          <p className='text-sm text-gray-600 mb-2'>Payment Success Rate</p>
          <p className='text-2xl font-bold text-gray-800'>0%</p>
        </div>
        <div className='rounded-lg border-2 border-blue-400 p-4'>
          <p className='text-sm text-gray-600 mb-2'>Chatbot Escalations</p>
          <p className='text-2xl font-bold text-gray-800'>0</p>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-4 mb-6'>
        <div className='rounded-lg border-2 border-blue-400 p-4'>
          <p className='text-sm text-gray-600 mb-2'>Active Patients</p>
          <p className='text-2xl font-bold text-gray-800'>{activePatients || 0}</p>
        </div>
        <div className='rounded-lg border-2 border-blue-400 p-4'>
          <p className='text-sm text-gray-600 mb-2'>Active Doctors</p>
          <p className='text-2xl font-bold text-gray-800'>{activeDoctors || 0}</p>
        </div>
        <div className='rounded-lg border-2 border-blue-400 p-4'>
          <p className='text-sm text-gray-600 mb-2'>Active Investors</p>
          <p className='text-2xl font-bold text-gray-800'>{activeInvestor || 0}</p>
        </div>
      </div>

      <h2 className='text-lg font-semibold mb-4 text-gray-700'>Graphs / Charts</h2>

      {/* Charts Section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {/* Appointments Chart */}
        <div className='rounded-lg border-2 border-blue-400 p-5'>
          <p className='text-sm text-gray-700 mb-1'>Appointments per week</p>
          <p className='text-3xl font-bold text-gray-800 mb-1'>+12%</p>
          <p className='text-xs text-gray-500 mb-4'>
            vs. last week <span className='text-green-600 font-semibold'>+12%</span>
          </p>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={appointmentsData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#374151"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className='flex justify-between text-xs text-gray-500 mt-2'>
            {appointmentsData.map(d => (
              <span key={d.day}>{d.day}</span>
            ))}
          </div>
        </div>

        {/* Website Traffic Chart */}
        <div className='rounded-lg border-2 border-blue-400 p-5'>
          <p className='text-sm text-gray-700 mb-1'>Website Traffic</p>
          <p className='text-3xl font-bold text-gray-800 mb-1'>+0%</p>
          <p className='text-xs text-gray-500 mb-4'>
            vs. last month <span className='text-green-600 font-semibold'>+12%</span>
          </p>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={trafficData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#374151"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className='flex justify-between text-xs text-gray-500 mt-2'>
            {trafficData.map(d => (
              <span key={d.month}>{d.month}</span>
            ))}
          </div>
        </div>

        {/* Payment Status Chart */}
        <div className='rounded-lg border-2 border-blue-400 p-5'>
          <p className='text-sm text-gray-700 mb-1'>Payment statuses</p>
          <p className='text-3xl font-bold text-gray-800 mb-1'>0%</p>
          <p className='text-xs text-gray-500 mb-4'>
            vs. last month <span className='text-green-600 font-semibold'>+5%</span>
          </p>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={paymentData}>
              <Bar dataKey="value" fill="#f1f1f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className='flex justify-around text-xs text-gray-500 mt-2'>
            {paymentData.map(d => (
              <span key={d.status}>{d.status}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;