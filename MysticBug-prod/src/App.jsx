import DoctorLogin from './pages/DoctorLogin'
import Login from './pages/Login'
import { Routes, Route } from "react-router-dom"
import PatientLogin from './pages/PatientLogin'
import InvestorLogin from './pages/InvestorLogin'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/patient-login' element={<PatientLogin />} />
        <Route path='/doctor-login' element={<DoctorLogin />} />
        <Route path='/investor-login' element={<InvestorLogin />} />
      </Routes>
    </div>
  )
}

export default App
