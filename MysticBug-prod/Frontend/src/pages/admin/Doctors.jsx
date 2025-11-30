import { useState, useEffect } from 'react'
import { icons } from "../../assets/assets"
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
const Doctors = () => {
  const [specialization, setSpecialization] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [doctorsData, setDoctorsData] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [addDoctorModal, setAddDoctorModal] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [doctorPatients, setDoctorPatients] = useState([])
  const [loadingPatients, setLoadingPatients] = useState(false)


  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  const navigate = useNavigate()
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${BASE_URL}/doctors`)
        const data = await response.json()
        setDoctorsData(data.doctors)
      } catch (error) {
        console.log("error while getting doctors", error.message)
      }
    }
    fetchDoctors()
  }, [BASE_URL])

  const fetchDoctorPatients = async (doctor) => {
    setLoadingPatients(true)
    try {
      const response = await fetch(`${BASE_URL}/appointments/smart_userdata?doctor=${doctor}`)
      const data = await response.json()
      setDoctorPatients(data || [])
    } catch (error) {
      console.log("error while getting doctor's patients", error.message)
      setDoctorPatients([])
    } finally {
      setLoadingPatients(false)
    }
  }

  const handleViewProfile = (doctor) => {
    setSelectedDoctor(doctor)
    setModalOpen(true)
    fetchDoctorPatients(doctor.name)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedDoctor(null)
    setDoctorPatients([])
  }

  const filteredData = doctorsData.filter((user) => {
    let specializationMatch = specialization ? user.specialization === specialization : true
    let searchMatch = searchTerm ? user.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
    return specializationMatch && searchMatch
  })

  return (
    <div className='bg-[#d1e8f3] min-h-screen p-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-gray-800'>Doctors</h1>
        <button
          className='px-3 py-1 bg-gray-200 rounded-lg cursor-pointer'
          onClick={() => navigate('add_doctor')}>
          Add Doctor
        </button>
      </div>

      <div className='flex justify-center items-center gap-2 w-full p-2 rounded-md mt-8 bg-gray-200'>
        <span><icons.FaSearch size={20} /></span>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="search"
          className='w-full bg-transparent outline-none placeholder:text-[#4A739C]'
          placeholder='Search doctors'
        />
      </div>

      <div className='flex flex-start gap-4 mt-3'>
        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className='bg-[#e8edf2] border-2 border-b-purple-400 px-3 py-1 rounded-md outline-none'
        >
          <option value="">All Specializations</option>
          <option value="cardiology">Cardiology</option>
          <option value="neurology">Neurology</option>
          <option value="pediatrics">Pediatrics</option>
          <option value="dermatology">Dermatology</option>
          <option value="orthopedics">Orthopedics</option>
          <option value="urology">Urology</option>
          <option value="gastroenteology">Gastroenterology</option>
          <option value="endocrinology">Endocrinology</option>
        </select>
      </div>

      <div className="rounded-lg mt-6 overflow-y-auto max-h-[68vh]">
        <table className="bg-[#f7fafc] w-full">
          <thead>
            <tr className="text-center font-semibold bg-gray-100">
              <th className="px-4 py-3">Doctor ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Specialization</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className='py-6 text-center'><Loader /></td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((data, index) => (
                <tr className="text-center" key={data._id}>
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{data.name}</td>
                  <td className="px-4 py-3">{data.email}</td>
                  <td className="px-4 py-3">
                    <button className="capitalize">
                      {data.specialization}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button className="cursor-auto px-3 py-1 bg-[#e8edf2] rounded">
                      {data.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="text-[#4D7399] text-sm font-bold px-4 py-3 space-x-2">
                    <button
                      className="cursor-pointer shadow-md px-3 py-1 bg-[#e8edf2] rounded hover:bg-[#d8e3ee]"
                      onClick={() => handleViewProfile(data)}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className='text-center font-semibold text-red-500'>
                <td colSpan="6" className="py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200] p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-gray-800">Doctor Profile</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <icons.MdClose size={24} />
              </button>
            </div>

            {/* Doctor Details */}
            <div className="p-6 border-b bg-[#f7fafc]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold text-gray-800">{selectedDoctor.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-800">{selectedDoctor.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Specialization</p>
                  <p className="font-semibold text-gray-800 capitalize">{selectedDoctor.specialization}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className={`font-semibold ${selectedDoctor.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedDoctor.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
            </div>

            {/* Patients List */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Patients List</h3>

              {loadingPatients ? (
                <div className="text-center py-8 text-gray-500">Loading patients...</div>
              ) : doctorPatients.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full bg-white border rounded-lg">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-3 font-semibold">Patient ID</th>
                        <th className="px-4 py-3 font-semibold">Name</th>
                        <th className="px-4 py-3 font-semibold">Age</th>
                        <th className="px-4 py-3 font-semibold">illness</th>
                        <th className="px-4 py-3 font-semibold">Last Visit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctorPatients.map((patient, index) => (
                        <tr key={patient._id || index} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-3">{index + 1}</td>
                          <td className="px-4 py-3">{patient.patientName}</td>
                          <td className="px-4 py-3">{patient.age || 'N/A'}</td>
                          <td className="px-4 py-3">{patient.reason || 'N/A'}</td>
                          <td className="px-4 py-3">
                            {new Date(patient.date).toLocaleDateString('en-GB', {
                              day: "numeric",
                              month: "short",
                              year: "numeric"
                            }) || 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No patients found for this doctor
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Doctors