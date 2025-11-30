import { useState } from 'react'
import Navbar from '../components/Navbar'
import { images } from '../assets/assets'
import AppointmentsModal from '../components/patient/AppointmentsModal'
import MedicalRecords from '../components/patient/MedicalRecords'
import Prescriptions from '../components/patient/Prescriptions'
import Reminders from '../components/patient/Reminders'
import Monitoring from '../components/patient/Monitoring'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const PatientDashboard = () => {
  const [selectedCard, setSelectedCard] = useState(null)
  const [activeDoctorCount, setActiveDoctorCount] = useState(0)
  const { user, userName } = useAuth()
  const displayName = userName || user
  const navigate = useNavigate()
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  const cardsData = [
    { id: 1, src: images.Appointments, title: "Appointments" },
    { id: 2, src: images.Medical_Records, title: "Medical Records" },
    { id: 3, src: images.Prescriptions, title: "Prescriptions" },
    { id: 4, src: images.Reminders, title: "Reminders" },
    { id: 5, src: images.Monitoring, title: "Monitoring" }
  ]

  const handleNavigateToUpload = () => {
    setSelectedCard(null);
    setTimeout(() => {
      navigate("/patient-dashboard/upload-medical-records");
    }, 50);
  };

  useEffect(() => {
    const fetchActiveDoctorsCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}/doctors/get_active_doctor_count`)
        const data = await response.json()
        setActiveDoctorCount(data.activeDoctorsCount || 0)
      } catch (error) {
        console.log("error while getting active doctors count:", error)
      }
    }
    fetchActiveDoctorsCount()
  }, [BASE_URL])

  const handleSupportCall = () => {
    window.location.href = "tel:number"
  }
  return (
    <div className='bg-[#76b1c1] h-full min-h-screen relative overflow-auto sm:overflow-hidden'>
      <div className='absolute top-20 p-6 w-full'>
        <div className='bg-transparent rounded-xl p-6'>
          <div className='max-w-7xl flex justify-between items-center mb-6'>
            <h1 className='font-merriweather text-36 font-bold'>
              Welcome Back, {displayName || "patient"}
            </h1>
            <div className='flex flex-col justify-center items-center gap-2'>
              <p className='font-lato text-16 font-bold sm:pr-5'>
                Doctors Active: {activeDoctorCount}
              </p>
              <button className='-mb-3 px-3 py-2 bg-green-800 rounded text-gray-200 outline-none cursor-pointer' onClick={() => navigate('messages')}>
                Messages
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className='flex flex-wrap gap-8'>
            {cardsData.map((card) => (
              <div
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className='cursor-pointer flex flex-col justify-center items-center rounded-2xl shadow-lg bg-white p-2 w-[400px] z-20'
              >
                <img
                  src={card.src}
                  alt={card.title}
                  className='w-[140px] h-[120px] object-cover'
                />
                <h1 className='font-merriweather text-36 font-bold'>
                  {card.title}
                </h1>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Wave + Medical Assistant */}
        <div className='hidden sm:flex fixed bottom-0 right-0 z-10'>
          <img
            src={images.bottomWave}
            alt="bottomWave image"
            className='w-full h-[490px]'
          />

          <div className='absolute right-20 bottom-[-95px] w-[450px] h-[465px]'>
            <img
              onClick={handleSupportCall}
              src={images.alarm_bell}
              alt='emergency alert assistant'
              className='w-[350px] h-full object-contain cursor-pointer'
            />
          </div>
        </div>

        {/* Modal */}
        {selectedCard && (
          selectedCard.id === 1 ? <AppointmentsModal onClose={() => setSelectedCard(null)} /> : selectedCard.id === 2 ?
            <MedicalRecords
              onClose={() => setSelectedCard(null)}
              onAddNew={handleNavigateToUpload}
            /> :
            selectedCard.id === 3 ? <Prescriptions onClose={() => setSelectedCard(null)} /> :
              selectedCard.id === 4 ? <Reminders onClose={() => setSelectedCard(null)} /> :
                selectedCard.id === 5 ? <Monitoring onClose={() => setSelectedCard(null)} /> :
                  null
        )}
      </div>
    </div >
  )
}

export default PatientDashboard
