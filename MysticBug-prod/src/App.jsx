import DoctorLogin from './pages/DoctorLogin'
import Login from './pages/Login'
import { Routes, Route } from "react-router-dom"
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/doctor-login' element={<DoctorLogin />} />
      </Routes>
    </div>
  )
}

export default App
