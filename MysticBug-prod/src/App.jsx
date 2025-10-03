import Login from './pages/Login'
import { Routes, Route } from "react-router-dom"
import OtpReset from './pages/OtpReset'
import AdminLogin from './pages/AdminLogin'
import InvestorLogin from './pages/InvestorLogin'
import DoctorLogin from './pages/DoctorLogin'
import PatientLogin from './pages/PatientLogin'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/patient-login' element={<PatientLogin />} />
        <Route path='/doctor-login' element={<DoctorLogin />} />
        <Route path='/investor-login' element={<InvestorLogin />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/forgot-password' element={<OtpReset />} />

      </Routes>
    </div>
  )
}

export default App
