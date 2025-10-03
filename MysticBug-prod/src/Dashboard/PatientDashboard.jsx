import { useState } from 'react'
import Navbar from '../components/Navbar'
import { images } from '../assets/assets'
import AppointmentsModal from '../components/AppointmentsModal'
import MedicalRecords from '../components/MedicalRecords'
import Prescriptions from '../components/Prescriptions'
import Reminders from '../components/Reminders'
import Monitoring from '../components/Monitoring'

const PatientDashboard = () => {
  const [selectedCard, setSelectedCard] = useState(null)

  const cardsData = [
    { id: 1, src: images.Appointments, title: "Appointments" },
    { id: 2, src: images.Medical_Records, title: "Medical Records" },
    { id: 3, src: images.Prescriptions, title: "Prescriptions" },
    { id: 4, src: images.Reminders, title: "Reminders" },
    { id: 5, src: images.Monitoring, title: "Monitoring" }
  ]

  return (
    <div className='bg-[#76b1c1] h-full min-h-screen relative overflow-auto sm:overflow-hidden'>
      <Navbar navBG="#76b1c1" searchBarColor="#93d8c1" />

      <div className='absolute top-20 p-6 w-full'>
        <div className='bg-transparent rounded-xl p-6'>
          <div className='flex justify-between items-center mb-6'>
            <h1 className='font-merriweather text-36 font-bold'>
              Welcome Back, PatientName
            </h1>
            <p className='font-lato text-16 font-bold'>
              Doctors Active: XX
            </p>
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
          <img
            src={images.Medical_assistant}
            alt='emergency alert assistant'
            className='w-[450px] h-[450px] object-contain absolute right-10 bottom-[-100px]  pointer-events-none'
          />
        </div>

        {/* Modal */}
        {selectedCard && (
          selectedCard.id === 1 ? <AppointmentsModal onClose={() => setSelectedCard(null)} /> : selectedCard.id === 2 ? <MedicalRecords onClose={() => setSelectedCard(null)} /> :
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
