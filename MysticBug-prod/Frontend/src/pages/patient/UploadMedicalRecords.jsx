import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
const BASE_URL = import.meta.env.VITE_API_BASE_URL

const UploadMedicalRecords = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate()
  const { uid } = useAuth()
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("inside handler")
    if (!name || !email || !file) {
      alert("Please fill all required fields and upload a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("file", file);
    console.log("inside formdata:", name, email, file)

    try {
      console.log("inside try:", name, email, file)

      const res = await fetch(`${BASE_URL}/medical_records/${uid}`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to upload record");

      const data = await res.json();
      alert("Medical record uploaded successfully!");
      setName("");
      setEmail("");
      setFile(null);
      navigate('/patient-dashboard')
    } catch (error) {
      alert("Failed to upload record. Please try again.");
    }
  };

  return (
    <div className="bg-[#76b1c1] min-h-screen flex flex-col">
      <Navbar navBG={"#76b1c1"} searchBarColor={"#93ced8"} />

      <div className="flex flex-1 justify-center items-center px-4">
        <div className="w-full max-w-2xl">
          <h2 className="font-merriweather text-3xl sm:text-4xl font-normal mb-4 text-center">
            Upload Previous Medical Records
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-lg mx-auto"
          >
            <p className="text-base sm:text-lg font-lato font-normal mb-4 text-center">
              Upload your previous medical records in the below given fields
            </p>

            <label htmlFor="name" className="mb-2 text-sm sm:text-base">
              Name*
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded-md bg-[#93d8c1] mb-4"
              required
            />

            <label htmlFor="email" className="mb-2 text-sm sm:text-base">
              Email*
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-md bg-[#93d8c1] mb-4"
              required
            />

            <label htmlFor="file" className="mb-2 text-sm sm:text-base">
              Upload Scanned PDF*
            </label>
            <input
              type="file"
              id="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="p-2 rounded-md bg-[#93d8c1] mb-4"
              required
            />

            <button
              type="submit"
              className="bg-[#0a5b58] text-white p-2 rounded-lg hover:bg-[#094946] transition-all text-base sm:text-lg"
            >
              Upload Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );

};

export default UploadMedicalRecords;
