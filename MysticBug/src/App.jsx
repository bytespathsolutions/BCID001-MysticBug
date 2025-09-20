import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import NotFound from "./components/NotFound"
import ContactUs from "./pages/ContactUs"
import Aboutus from "./pages/Aboutus"

const App = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="max-w-[1440px] mx-auto">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <div className="max-w-[1440px] mx-auto">
        <Footer />
      </div>
    </div>
  )
}

export default App
