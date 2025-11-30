import { useEffect, useState } from "react";
import { icons } from "../../assets/assets";
import { useAuth } from "../../Context/AuthContext";
import DoctorChatModal from "./DoctorChatModal";
import DoctorToDoctorChatModal from "./DoctorToDoctorChatModal";
import Loader from "../admin/Loader";

const DoctorMessage = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [doctorChatOpen, setDoctorChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Patients");
  const [lastMessages, setLastMessages] = useState({});

  const { uid } = useAuth();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  //fetch all patients related to doctor
  useEffect(() => {
    const fetchDoctorPatients = async () => {
      try {
        setIsLoading(true);
        let doctorId = uid;
        const res = await fetch(`${BASE_URL}/messages/doctor-patients/${doctorId}`);
        if (!res.ok) throw new Error("Failed to fetch doctor patients");

        const data = await res.json();
        setPatients(data);
      } catch (error) {
        console.error("Error loading patients:", error);
        setPatients([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (uid) {
      fetchDoctorPatients();
      const interval = setInterval(fetchDoctorPatients, 5000);
      return () => clearInterval(interval);
    }
  }, [uid, BASE_URL]);

  // Fetch last message for each patient
  useEffect(() => {
    const loadLastMessages = async () => {
      if (patients.length === 0) return;

      const promises = patients.map(async (p) => {
        const res = await fetch(`${BASE_URL}/messages/last-messages/${uid}/${p.patientId}`);
        const data = await res.json();
        return { patientId: p.patientId, lastMessage: data };
      });

      const results = await Promise.all(promises);

      setPatients((prev) =>
        prev.map((p) => ({
          ...p,
          lastMessage: results.find((r) => r.patientId === p.patientId)?.lastMessage || null,
        }))
      );
    };

    loadLastMessages();
    const interval = setInterval(loadLastMessages, 5000);
    return () => clearInterval(interval);
  }, [patients.length]);

  // Fetch all doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${BASE_URL}/doctors`);
        const data = await res.json();
        setDoctors(data.doctors);
      } catch (error) {
        console.log("error while fetching doctors");
      }
    };
    if (uid) fetchDoctors();
  }, [uid, BASE_URL]);

  // Fetch last message for each doctor
  useEffect(() => {
    const loadDoctorLastMessages = async () => {
      if (doctors.length === 0) return;

      const promises = doctors.map(async (doc) => {
        const res = await fetch(`${BASE_URL}/messages/doctor-last-messages/${uid}/${doc.uid}`);
        const data = await res.json();
        return { uid: doc.uid, lastMessage: data };
      });

      const results = await Promise.all(promises);

      setDoctors((prev) =>
        prev.map((p) => ({
          ...p,
          lastMessage: results.find((r) => r.uid === p.uid)?.lastMessage || null,
        }))
      );
    };

    loadDoctorLastMessages();
    const interval = setInterval(loadDoctorLastMessages, 5000);

    return () => clearInterval(interval);
  }, [doctors.length, uid]);

  const filteredPatients = patients.filter((p) =>
    p.patientName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase()) && doc.uid !== uid
  );
  return (
    <div className="w-full h-screen bg-[#f3e8d1]">
      <div className="flex-1 overflow-hidden flex flex-col items-center px-4 py-6">
        <div className="w-full max-w-5xl">
          <h1 className="font-bold text-3xl mb-6">Messages</h1>

          {/* Tabs */}
          <div className="flex gap-8 mb-6 border-b-2 border-[#004d4d] pb-2">
            <span
              onClick={() => setActiveTab("Patients")}
              className={`${activeTab === "Patients"
                ? "font-bold text-sm border-b-4 border-[#004d4d]"
                : "text-[#59788C] font-bold text-sm"
                } cursor-pointer transition-all`}
            >
              Patients
            </span>

            <span
              onClick={() => setActiveTab("Internal")}
              className={`${activeTab === "Internal"
                ? "font-bold text-sm border-b-4 border-[#004d4d]"
                : "text-[#59788C] font-bold text-sm"
                } cursor-pointer transition-all`}
            >
              Internal
            </span>
          </div>

          {/* PATIENT TAB */}
          {activeTab === "Patients" && (
            <>
              <div className="flex items-center gap-2 bg-[#f6e2ac] rounded-md px-4 py-3 mb-4">
                <icons.FaSearch className="w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#f6e2ac] outline-none"
                />
              </div>

              {isLoading && <p className="text-center text-[#004d4d] py-8">Loading...</p>}

              {!isLoading && filteredPatients.length === 0 && (
                <p className="text-center py-8 text-[#004d4d]">No patients found.</p>
              )}
              <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-300px)]">
                {filteredPatients.map((p) => (
                  <div
                    key={p.patientId}
                    onClick={() => {
                      setSelectedPatient(p);
                      setChatOpen(true);
                    }}
                    className="bg-[#004d4d] p-4 rounded-lg cursor-pointer flex gap-4 hover:bg-[#006666] transition-colors"
                  >
                    <div className="w-12 h-12 bg-[#f6e2ac] rounded-full flex items-center justify-center font-bold text-xl text-[#004d4d]">
                      {p.patientName.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg">{p.patientName}</h3>

                      <p className="text-gray-300 text-sm truncate">
                        {p.lastMessage?.message ? p.lastMessage.message : "Start a conversation"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* INTERNAL TAB */}
          {activeTab === "Internal" && (
            <>
              <div className="flex items-center gap-2 bg-[#f6e2ac] rounded-md px-4 py-3 mb-4">
                <icons.FaSearch className="w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search doctors..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#f6e2ac] outline-none"
                />
              </div>

              {isLoading && <p className="text-center text-[#004d4d] py-8"><Loader /></p>}

              {!isLoading && filteredDoctors.length === 0 && (
                <p className="text-center py-8 text-[#004d4d]">No doctors found.</p>
              )}
              <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-300px)]">
                {filteredDoctors.map((doc) => (
                  <div
                    key={doc._id}
                    onClick={() => {
                      setSelectedDoctor(doc);
                      setDoctorChatOpen(true);
                    }}
                    className="bg-[#004d4d] p-4 rounded-lg cursor-pointer flex gap-4 hover:bg-[#006666] transition-colors"
                  >
                    <div className="w-12 h-12 bg-[#f6e2ac] rounded-full flex items-center justify-center font-bold text-xl text-[#004d4d]">
                      {doc.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg">{doc.name}</h3>
                      <p className="text-gray-300 text-sm truncate">
                        {doc.lastMessage?.message ? doc.lastMessage.message : "Start a conversation"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Patient Chat Modal */}
      {chatOpen && selectedPatient && (
        <DoctorChatModal patient={selectedPatient} onClose={() => setChatOpen(false)} />
      )}

      {/* Doctor-to-Doctor Chat Modal */}
      {doctorChatOpen && selectedDoctor && (
        <DoctorToDoctorChatModal doctor={selectedDoctor} onClose={() => setDoctorChatOpen(false)} />
      )}
    </div>
  );
};

export default DoctorMessage;