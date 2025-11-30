import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { icons, images } from '../../assets/assets';
import { useAuth } from "../../Context/AuthContext"
function PatientDetail() {
  const { uid } = useParams();
  const { uid: doctorId } = useAuth()
  const [patient, setPatient] = useState([]);
  const [ehrOpen, setEhrOpen] = useState(false)
  const [labResult, setLabResult] = useState(false)
  const [imaging, setImaging] = useState(false)
  const [prescription, setPrescription] = useState(false)
  const [clinicalNotes, setClinicalNotes] = useState(false)
  const [recordPopup, setRecordPopup] = useState(false)
  const [prescriptions, setPrescriptions] = useState([]);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation()
  const doctor = location?.state?.doctor
  useEffect(() => {
    if (uid) {
      setFormData(prev => ({
        ...prev,
        patientId: uid,
        doctorName: doctor
      }));
    }
  }, [uid]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`${BASE_URL}/patient/${uid}`);
        const data = await response.json();
        setPatient(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchPatient();
  }, [uid]);

  useEffect(() => {
    if (prescription && patient) {
      fetchPrescriptions();
    }
  }, [prescription, patient]);

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/prescriptions/patient/${uid}`);
      const data = await response.json();
      setPrescriptions(data.prescriptions || []);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const [formData, setFormData] = useState({
    patientId: uid,
    doctorId: doctorId,
    medication: '',
    notes: '',
    pdfFile: null,
    doctorName: doctor
  });
  const [fileName, setFileName] = useState('');
  useEffect(() => {
    if (uid && doctorId && doctor) {
      setFormData(prev => ({
        ...prev,
        patientId: uid,
        doctorId: doctorId,
        doctorName: doctor
      }));
    }
  }, [uid, doctorId, doctor]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        pdfFile: file
      }));
      setFileName(file.name);
    } else {
      alert('Please upload a PDF file');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileName) {
      alert('Please upload a PDF file');
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('patientId', formData.patientId);
      submitData.append('doctorId', formData.doctorId);
      submitData.append('medication', formData.medication);
      submitData.append('notes', formData.notes);
      submitData.append('doctorName', formData.doctorName);
      if (formData.pdfFile) {
        submitData.append('prescription', formData.pdfFile);
      }
      const response = await fetch(`${BASE_URL}/prescriptions`, {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        throw new Error('Failed to create prescription');
      }
      setFormData({
        patientId: uid,
        doctorId: doctorId,
        medication: '',
        notes: '',
        pdfFile: null,
        doctorName: doctor
      });

      setFileName('');
      setLoading(false)
      alert('Prescription created successfully!');
      setShowPrescriptionForm(false)

    } catch (error) {
      setLoading(false)
      console.error('Error:', error);
      alert('Failed to create prescription. Please try again.');
    }
  };

  return (
    <div className="bg-[#f3e8d1] min-h-screen p-4">
      <h1 className="text-2xl font-lato font-bold mb-4">Patient Records</h1>
      <p>Review and manage patient information</p>

      <div className="max-w-5xl rounded-md border py-3 mt-7 flex justify-between gap-2">
        <div>
          <h2 className="text-3xl font-semibold font-merriweather mb-3">{patient.patientName}</h2>
          <p className='text-base font-medium'>Age: {patient.age || "N/A"}</p>
          <button onClick={() => setRecordPopup(true)}
            className="mt-5 bg-[#fdbc23] px-5 py-2 rounded-2xl text-black hover:bg-[#f5a500] transition">
            View Record
          </button>
        </div>
        <img src={images.female} alt={"patient_image"} className='w-44 h-[171px] rounded-xl border border-red-500' />
      </div>
      <h1 className="text-2xl font-lato font-bold mt-7">Patient Records</h1>
      <ul className='max-w-5xl space-y-2 mt-2'>
        <li className='bg-[#fdbc23] rounded-md p-2 flex justify-between items-center' onClick={() => setEhrOpen(true)}>
          <div className='flex items-center gap-3'>
            <icons.AiOutlineFileText size={24} className='p-2 rounded bg-white h-10 w-10' />
            <div>
              <h1>EHR</h1>
              <p>Electronic Health Record</p>
            </div>
          </div>
          <icons.IoIosArrowForward size={24} />
        </li>
        <li className='bg-[#fdbc23] rounded-md p-2 flex justify-between items-center' onClick={() => setLabResult(true)}>
          <div className='flex items-center gap-3'>
            <icons.AiOutlineFileText size={24} className='p-2 rounded bg-white h-10 w-10' />
            <div>
              <h1>Lab Result</h1>
              <p>Lab Result</p>
            </div>
          </div>
          <icons.IoIosArrowForward size={24} />
        </li>
        <li className='bg-[#fdbc23] rounded-md p-2 flex justify-between items-center' onClick={() => setImaging(true)}>
          <div className='flex items-center gap-3'>
            <icons.IoImageOutline size={24} className='p-2 rounded bg-white h-10 w-10' />
            <div>
              <h1>Imaging</h1>
              <p>Imaging(X-rays,MRIs)</p>
            </div>
          </div>
          <icons.IoIosArrowForward size={24} />
        </li>
        <li className='bg-[#fdbc23] rounded-md p-2 flex justify-between items-center' onClick={() => setPrescription(true)}>
          <div className='flex items-center gap-3'>
            <icons.AiOutlineFileText size={24} className='p-2 rounded bg-white h-10 w-10' />
            <div>
              <h1>Prescriptions</h1>
              <p>Prescriptions</p>
            </div>
          </div>
          <icons.IoIosArrowForward size={24} />
        </li>
        <li className='bg-[#fdbc23] rounded-md p-2 flex justify-between items-center' onClick={() => setClinicalNotes(true)}>
          <div className='flex items-center gap-3'>
            <icons.AiOutlineFileText size={24} className='p-2 rounded bg-white h-10 w-10' />
            <div>
              <h1>Clinical Notes</h1>
              <p>Clinical Notes</p>
            </div>
          </div>
          <icons.IoIosArrowForward size={24} />
        </li>

      </ul>
      {recordPopup && <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="relative bg-[#fdbc23] rounded-xl p-4 w-full max-w-5xl h-[45vh] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2">
              <h2 className="text-24 font-merriweather font-bold">Patient Record Summary</h2>
              <h2 className="font-lato font-bold">{patient.patientName}</h2>
            </div>
            <button
              onClick={() => setRecordPopup(false)}
              className="text-5xl"
            >
              &times;
            </button>
          </div>
          <div>
            <p className='max-w-3xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit nisl quis urna tincidunt lacinia. Nulla luctus pretium justo, a ornare elit tristique vel. Vestibulum feugiat et elit sed pellentesque. Nunc hendrerit metus quis imperdiet facilisis. Suspendisse felis ligula, scelerisque eget arcu sed, ornare interdum nisl. Quisque sapien erat, dictum ut augue ac, congue congue tortor. Cras hendrerit risus sed consequat vestibulum. Vivamus eget quam lobortis, lacinia ipsum mattis, commodo sem. Sed mattis sed dolor sit amet auctor. Aliquam quis enim vitae sapien luctus accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
          </div>
          <img src={images.Patient} alt="Patient" className='w-[200px] h-[200px] absolute bottom-0 right-5' />
        </div>
      </div>}
      {ehrOpen && <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-[#fdbc23] rounded-xl p-4 w-full max-w-5xl h-[86vh] relative overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2">
              <h2 className="text-24 font-merriweather font-bold">Medical Records</h2>
              <h2 className="font-lato font-bold">EHR Records </h2>
            </div>
            <button
              onClick={() => setEhrOpen(false)}
              className=" text-5xl"
            >
              &times;
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center overflow-auto flex-wrap gap-4">

            <div className="p-2 flex flex-col gap-2 h-[200px] w-[200px] rounded-2xl bg-white">
              <div
                className="flex justify-center items-center h-full w-full bg-[#D9D9D9] rounded-full">
                <span
                  className="text-7xl cursor-pointer">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>}
      {labResult && <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-[#fdbc23] rounded-xl p-4 w-full max-w-5xl h-[86vh] relative overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2">
              <h2 className="text-24 font-merriweather font-bold">Medical Records</h2>
              <h2 className="font-lato font-bold">Lab Records</h2>
            </div>
            <button
              onClick={() => setLabResult(false)}
              className=" text-5xl"
            >
              &times;
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center overflow-auto flex-wrap gap-4">

            <div className="p-2 flex flex-col gap-2 h-[200px] w-[200px] rounded-2xl bg-white">
              <div
                className="flex justify-center items-center h-full w-full bg-[#D9D9D9] rounded-full">
                <span
                  className="text-7xl cursor-pointer">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>}

      {imaging && <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-[#fdbc23] rounded-xl p-4 w-full max-w-5xl h-[86vh] relative overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2">
              <h2 className="text-24 font-merriweather font-bold">Medical Records</h2>
              <h2 className="font-lato font-bold">Imaging</h2>
            </div>
            <button
              onClick={() => setImaging(false)} className=" text-5xl"
            >
              &times;
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center overflow-auto flex-wrap gap-4">

            <div className="p-2 flex flex-col gap-2 h-[200px] w-[200px] rounded-2xl bg-white">
              <div
                className="flex justify-center items-center h-full w-full bg-[#D9D9D9] rounded-full">
                <span
                  className="text-7xl cursor-pointer">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>}
      {prescription && <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[150]">
        <div className="bg-[#fdbc23] rounded-xl p-4 w-full max-w-5xl h-[86vh] relative overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2">
              <h2 className="text-24 font-merriweather font-bold">Medical Records</h2>
              <h2 className="font-lato font-bold">Prescriptions</h2>
            </div>
            <button
              onClick={() => setPrescription(false)} className=" text-5xl"
            >
              &times;
            </button>
          </div>
          {/* Display existing prescriptions */}
          <div className="flex flex-col sm:flex-row items-center overflow-auto flex-wrap gap-4 mb-4">
            <div className="p-2 h-[200px] w-[200px] rounded-2xl bg-white">
              <div
                onClick={() => setShowPrescriptionForm(true)}
                className="flex justify-center items-center h-full w-full bg-[#D9D9D9] rounded-full cursor-pointer hover:bg-[#c0c0c0] transition">
                <span
                  className="text-7xl">+</span>
              </div>
            </div>
            {prescriptions.map((prescription) => (
              <div
                key={prescription._id}
                className="p-2 flex flex-col gap-2 h-[180px] w-[240px] rounded-2xl bg-[#f3e8d1]"
              >
                <p className="font-semibold text-sm">Dr. {prescription.doctorName}</p>
                <p className="font-semibold text-sm">{prescription.medication}</p>
                <p className="text-xs text-gray-700">{prescription.email}</p>
                <p className="text-xs text-gray-700">{prescription.notes}</p>
                <p className="text-xs text-gray-700">{new Date(prescription.createdAt).toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}</p>
                {prescription.pdfUrl && (
                  <a href={prescription.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center bg-[#fce2ac] rounded-lg p-2 hover:shadow-lg transition-shadow cursor-pointer"
                    title={prescription.pdfUrl}
                  >
                    <svg
                      className="w-10 h-10 mx-auto text-red-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                    </svg>
                  </a>
                )}
              </div>
            ))
            }
            {showPrescriptionForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Backdrop */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                  onClick={() => setShowPrescriptionForm(false)}
                />

                {/* Modal Content */}
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
                  <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">New Prescription</h2>
                    <button
                      onClick={() => setShowPrescriptionForm(false)}
                      className="text-gray-500 hover:text-gray-700 transition"
                    >
                      <icons.MdClose size={24} />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Medication */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Medication Name *
                      </label>
                      <input
                        type="text"
                        name="medication"
                        value={formData.medication}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="e.g., Amoxicillin"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows="3"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                        placeholder="Special instructions, warnings, etc."
                      />
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Prescription PDF
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
                        <input
                          name='pdf'
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          className="hidden"
                          id="pdf-upload"
                        />
                        <label
                          htmlFor="pdf-upload"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          {fileName ? (
                            <span className="text-sm text-green-600 font-medium">{fileName}</span>
                          ) : (
                            <>
                              <span className="text-sm text-gray-600">Click to upload PDF</span>
                              <span className="text-xs text-gray-400 mt-1">Max file size: 10MB</span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`max-w-[300px] mx-auto px-6 py-3 rounded-lg text-white font-medium flex items-center justify-center
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                      {loading ? "Creating..." : "Create Prescription"}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div >
      }
      {clinicalNotes && <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-[#fdbc23] rounded-xl p-4 w-full max-w-5xl h-[86vh] relative overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2">
              <h2 className="text-24 font-merriweather font-bold">Medical Records</h2>
              <h2 className="font-lato font-bold">Clinical Notes</h2>
            </div>
            <button
              onClick={() => setClinicalNotes(false)} className=" text-5xl"
            >
              &times;
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center overflow-auto flex-wrap gap-4">

            <div className="p-2 flex flex-col gap-2 h-[200px] w-[200px] rounded-2xl bg-white">
              <div
                className="flex justify-center items-center h-full w-full bg-[#D9D9D9] rounded-full">
                <span
                  className="text-7xl cursor-pointer">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </div >
  );
}

export default PatientDetail;