import Login from './pages/Login'
import { Routes, Route } from "react-router-dom"
import OtpReset from './pages/OtpReset'
import AdminLogin from './pages/AdminLogin'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/forgot-password' element={<OtpReset />} />

      </Routes>
    </div>
  )
}

export default App
