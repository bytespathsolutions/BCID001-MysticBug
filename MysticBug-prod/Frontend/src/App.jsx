import Login from './default-pages/Login'
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import OtpReset from './pages/OtpReset'
import AdminLogin from './Pages/admin/AdminLogin'
import InvestorLogin from './pages/InvestorLogin'
import DoctorLogin from './pages/doctors/DoctorLogin'
import PatientLogin from './pages/patient/PatientLogin'
import PatientDashboard from './Dashboard/PatientDashboard'
import UploadMedicalRecords from './Pages/patient/UploadMedicalRecords'
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
import DoctorDashboard from './Dashboard/DoctorDashboard'
import Overview from './Pages/doctors/Overview'
import Patients from './Pages/doctors/Patients'
import Appointments from './Pages/doctors/Appointments'
import Tasks from './Pages/doctors/Tasks'
import PatientDetail from './Pages/doctors/PatientDetail'
import AdminDashboard from './Dashboard/AdminDashboard'
import Dashboard from './Pages/admin/Dashboard'
import Users from './Pages/admin/Users'
import Doctors from './Pages/admin/Doctors'
import AdminAppointments from './Pages/admin/Appointments'
import Payments from './Pages/admin/Payments'
import MedicalHistory from './Pages/admin/MedicalHistory'
import ChatbotLogs from './Pages/admin/ChatbotLogs'
import Notifications from './Pages/admin/Notifications'
import PatientList from './Pages/admin/PatientList'
import Investors from './Pages/admin/Investors'
import SystemSettings from './Pages/admin/SystemSettings'
import AddDoctor from './Pages/admin/AddDoctor'
import InvestorDashboard from './Dashboard/InvestorDashboard'
import AddInvestor from './Pages/admin/AddInvestor'
import PatientMessage from './Pages/patient/PatientMessage'
import PatientChat from './Pages/patient/PatientChat'
import DoctorMessage from './Pages/doctors/DoctorMessage'
import ScrollToTop from './components/ScrollToTop'
import AuthEnterMobile from './Pages/AuthEnterMobile'
import AuthEnterOTP from './Pages/AuthEnterOtp'
const App = () => {
  const location = useLocation();

  // Hide both Navbar & Footer
  const hideBothPaths = [
    "/login",
    "/patient-login",
    "/doctor-login",
    "/investor-login",
    "/forgot-password",
    "/admin-login"
  ];

  // Hide only Footer (for dashboards)
  const hideFooterPaths = [
    "/patient-dashboard",
    "/admin-dashboard",
    "/doctor-dashboard",
    "/investor-dashboard",
    "/auth-enter-otp",
    "/auth-enter-mobile"
  ];

  const hideNavbar = hideBothPaths.some(path => location.pathname.startsWith(path));
  const hideFooter = hideBothPaths.some(path => location.pathname.startsWith(path)) ||
    hideFooterPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="overflow-x-hidden min-h-screen">
      <ScrollToTop />
      {!hideNavbar && (<div className="max-w-full">
        <Navbar />
      </div>)}
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
        <Route path='/auth-enter-mobile' element={<AuthEnterMobile />} />
        <Route path='/auth-enter-otp' element={<AuthEnterOTP />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/patient-dashboard/upload-medical-records" element={
          <ProtectedRoute allowedRole="patient">
            <UploadMedicalRecords />
          </ProtectedRoute>
        }
        />
        <Route
          path="/patient-dashboard/messages"
          element={
            <ProtectedRoute allowedRole="patient">
              <PatientMessage />
            </ProtectedRoute>} />
        <Route
          path="/patient/chat/:doctorId"
          element={
            <ProtectedRoute allowedRole="patient">
              <PatientChat />
            </ProtectedRoute>
          } />

        <Route
          path='/patient-dashboard'
          element={<ProtectedRoute allowedRole="patient">
            <PatientDashboard />
          </ProtectedRoute>}
        />

        <Route
          path='/investor-dashboard'
          element={
            <ProtectedRoute allowedRole="investor">
              <InvestorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='/doctor-dashboard'
          element={<ProtectedRoute allowedRole="doctor"><DoctorDashboard /></ProtectedRoute>}
        >
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="doctor/messages" element={<DoctorMessage />} />
          <Route path="overview" element={<Overview />} />
          <Route path="patients" element={<Patients />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="patient/:uid" element={<PatientDetail />} />

        </Route>
        <Route
          path='/admin-dashboard'
          element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='users' element={<Users />} />
          <Route path='doctors' element={<Doctors />} />
          <Route path='doctors/add_doctor' element={<AddDoctor />} />
          <Route path='appointments' element={<AdminAppointments />} />
          <Route path='medical_histories' element={<MedicalHistory />} />
          <Route path='payments' element={<Payments />} />
          <Route path='chatbot_logs' element={<ChatbotLogs />} />
          <Route path='notifications' element={<Notifications />} />
          <Route path='patientList' element={<PatientList />} />
          <Route path='investors' element={<Investors />} />
          <Route path='investors/add_investor' element={<AddInvestor />} />
          <Route path='system_settings' element={<SystemSettings />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      {!hideFooter && <Footer />}
    </div >
  )
}

export default App
