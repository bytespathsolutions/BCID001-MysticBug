import Login from './default-pages/Login'
import { Routes, Route } from "react-router-dom"
import OtpReset from './pages/OtpReset'
import AdminLogin from './pages/AdminLogin'
import InvestorLogin from './pages/InvestorLogin'
import DoctorLogin from './pages/DoctorLogin'
import PatientLogin from './pages/PatientLogin'
import PatientDashboard from './Dashboard/PatientDashboard'
import UploadMedicalRecords from './pages/UploadMedicalRecords'
import ProtectedRoute from './ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Homepage from './default-pages/Homepage'
import Aboutus from './default-pages/Aboutus'
import Diseases from './default-pages/Diseases'
import ContactUs from './default-pages/ContactUs'
import Terms from './default-pages/Terms'
import PrivacyPolicy from './default-pages/PrivacyPolicy'
import NotFound from './default-pages/NotFound'
const App = () => {
  return (
    <div>
      <div className="max-w-[1440px] mx-auto">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/diseases" element={<Diseases />} />
        <Route path="/login" element={<Login />} />
        <Route path='/patient-login' element={<PatientLogin />} />
        <Route path='/doctor-login' element={<DoctorLogin />} />
        <Route path='/investor-login' element={<InvestorLogin />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/forgot-password' element={<OtpReset />} />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/patient-dashboard/upload-medical-records"
          element={
            <ProtectedRoute allowedRole="patient">
              <UploadMedicalRecords />
            </ProtectedRoute>
          }
        />
        <Route
          path='/patient-dashboard'
          element={
            <ProtectedRoute allowedRole="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
