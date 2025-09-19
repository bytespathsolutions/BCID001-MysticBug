import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import NotFound from "./components/NotFound"
import ContactUs from "./pages/ContactUs"

const App = () => {
  return (
    <div className="max-w-[1440px] mx-auto min-h-screen sm:px-15 sm:py-2.5 ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
