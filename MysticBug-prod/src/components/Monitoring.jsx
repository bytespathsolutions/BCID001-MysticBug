import { images } from "../assets/assets"
const Monitoring = ({ onClose }) => {
  const medicalRecords = [
    { id: 1, name: "dummy" },
    { id: 2, name: "dummy" },
    { id: 3, name: "dummy" },
    { id: 4, name: "dummy" },
  ];

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-[#0a5b58] rounded-xl p-4 w-full max-w-6xl h-[96vh] relative overflow-auto">
          <div className="flex justify-between items-center mb-2">
            <div className="">
              <h2 className="text-white text-24 font-merriweather font-bold">Next Appointment</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white text-5xl hover:text-gray-300"
            >
              &times;
            </button>
          </div>

          <div>
            {/* dummy cards for now */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-[#93d8c1] rounded-lg p-4 text-center text-18 font-lato font-bold min-h-[150px] min-w-[260px] ">Appointment Info</div>
              <div className="bg-[#93d8c1] rounded-lg p-4 text-center text-18 font-lato font-bold min-h-[150px] min-w-[260px] ">Appointment Info</div>
            </div>
          </div>
          <h2 className="text-white text-24 font-merriweather font-bold mt-4">Latest Records</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            {
              medicalRecords.map((record) => (
                <div key={record.id} className="bg-[#93d8c1] rounded-lg p-4 text-center text-18 font-lato font-bold h-[150px] w-[200px]">{record.name}</div>
              ))
            }
          </div>
          <div>
            <h2 className="text-white text-24 font-merriweather font-bold mt-4">Latest Reminders</h2>
            <div className="max-w-3xl bg-[#93d8c1] p-2 px-4 rounded-2xl flex justify-between items-center">
              <p >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, expedita!</p>
              <p className="cursor-pointer text-black">X</p>
            </div>
          </div>

        </div>
        <div className="hidden sm:flex items-center absolute bottom-2 right-40 w-45 h-45">
          <img
            src={images.Monitoring}
            alt="Illustration"
            className="block w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}

export default Monitoring
