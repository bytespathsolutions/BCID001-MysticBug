import { useEffect, useState } from "react"
import { icons, images } from "../../assets/assets"
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from 'react-router-dom';
const Patients = () => {
  const { uid } = useAuth();
  const [patientsList, setPatientsList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  useEffect(() => {
    if (!uid) return;
    const fetchPatients = async () => {
      try {
        const res = await fetch(`${BASE_URL}/doctors/${uid}/patients`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch patients");
        setPatientsList(data.patients || []);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };
    fetchPatients();
  }, [uid]);
  const navigate = useNavigate();

  const handleNavigation = (uid, doctor) => {
    navigate(`/doctor-dashboard/patient/${uid}`, { state: { doctor } });
  };
  const filteredPatientsList = patientsList.filter((p) =>
    p.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="bg-[#f3e8d1] min-h-screen p-4">
      <h1 className="text-2xl font-lato font-bold mb-4">Patient Management</h1>

      <div className="bg-[#fdbc23] max-w-5xl rounded-md border py-3 px-4 flex items-center gap-2">
        <span>
          <icons.FaSearch size={20} />
        </span>
        <input
          type="text"
          placeholder="Search patient by name or ID"
          className="outline-none bg-transparent placeholder:text-black w-full ml-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h1 className="mt-6 mb-4 text-lg font-bold font-lato">Patient List</h1>

      {filteredPatientsList.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredPatientsList.map((patient) => (
            <div
              key={patient._id}
              className="flex justify-between max-w-md shadow p-4 rounded-lg"
            >
              <div>
                <h2 className="text-lg font-semibold">{patient.patientName}</h2>
                <p>Age: {patient.age || "N/A"}</p>
                <button onClick={() => handleNavigation(patient.uid, patient.doctor)}
                  className="mt-5 bg-[#fdbc23] px-5 py-2 rounded-2xl text-black hover:bg-[#f5a500] transition">
                  View Record
                </button>
              </div>
              <img
                src={images.female}
                alt={"patient_pic"}
                className="h-[171px] w-44 border border-black rounded-xl object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Patients; 