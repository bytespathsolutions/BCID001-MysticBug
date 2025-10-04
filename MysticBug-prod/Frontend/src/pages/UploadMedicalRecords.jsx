import Navbar from '../components/Navbar'

const UploadMedicalRecords = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    //add toast message as medical record added successfully.
  }
  return (
    <div className="bg-[#76b1c1] h-screen flex flex-col overflow-hidden">
      <Navbar navBG={"#76b1c1"} searchBarColor={"#93ced8"} />
      <div className="flex flex-1 justify-center items-center">
        <div className="w-full max-w-2xl">
          <h2 className="font-merriweather text-48 font-normal mb-4 text-center">
            Upload Previous Medical Records
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-lg mx-auto">
            <p className="text-18 font-lato font-normal mb-4 text-center">
              Upload your previous medical records in the below given fields
            </p>

            <label htmlFor="name" className="mb-2">Name*</label>
            <input
              type="text"
              id="name"
              className="p-2 rounded-md bg-[#93d8c1] mb-4"
            />

            <label htmlFor="email" className="mb-2">Email*</label>
            <input
              type="email"
              id="email"
              className="p-2 rounded-md bg-[#93d8c1] mb-4"
            />

            <label className="mb-2">Upload Scanned PDF</label>
            <textarea
              className="p-2 rounded-md bg-[#93d8c1] mb-4"
            />

            <button className="bg-[#0a5b58] text-white p-2 rounded-lg">
              Save Details
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UploadMedicalRecords
