import Banner from '../components/Banner'
import Chatbot from '../components/Chatbot'
import MedicalAssistant from '../components/MedicalAssistant'
import KnowMore from '../components/KnowMore'
import HealthCareNeeds from '../components/HealthCareNeeds'
import InstantHelp from '../components/InstantHelp'

const Homepage = () => {
  return (
    <div className="max-w-[1440px] mx-auto min-h-screen sm:px-15 sm:py-2.5 ">
      <Banner />
      <Chatbot />
      <MedicalAssistant />
      <KnowMore />
      <HealthCareNeeds />
      <InstantHelp />
    </div>
  )
}

export default Homepage
