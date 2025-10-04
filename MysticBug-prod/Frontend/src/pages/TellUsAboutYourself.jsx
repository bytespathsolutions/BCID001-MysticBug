import { useState } from 'react';
import Navbar from '../components/Navbar';
import { images } from '../assets/assets';

const TellUsAboutYourself = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    medicalHistory: '',
    previousHospitalizations: '',
    allergies: '',
    age: '',
    dateOfBirth: '',
    gender: '',
    oxymeterHeartbeat: '',
    bloodType: '',
    height: '',
    weight: '',
    address: '',
    bloodPressure: '',
    diabetes: '',
    existingInsurance: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#76b1c1] relative overflow-hidden">
      <Navbar searchBarColor="#93d7c1" />
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl mt-20">
        <h2 className="text-5xl text-center text-gray-900 font-bold mb-8">
          Tell us a bit more about yourself!
        </h2>
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-800 font-medium mb-2">Full Name*</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#Add0Da] border border-black  focus:outline-none placeholder:text-gray-700"
                placeholder='John Doe'
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium mb-2">Phone Number*</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#Add0Da] border border-black  focus:outline-none placeholder:text-gray-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-800 font-medium mb-2">Email*</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='JohnDoe@example.com'
                className="w-full px-4 py-3 bg-[#Add0Da] border border-black  focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium mb-2">Medical History</label>
              <input
                type="text"
                name="medicalHistory"
                placeholder="Enter Here"
                value={formData.medicalHistory}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#Add0Da] border border-black  focus:outline-none  placeholder-gray-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-800 font-medium mb-2">Previous Hospitalizations/Surgeries</label>
              <input
                type="text"
                name="previousHospitalizations"
                placeholder="Enter Here"
                value={formData.previousHospitalizations}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#Add0Da] border border-black  focus:outline-none  placeholder-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium mb-2">Allergies</label>
              <input
                type="text"
                name="allergies"
                placeholder="Enter Here"
                value={formData.allergies}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#Add0Da] border border-black  focus:outline-none  placeholder-gray-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-800 font-medium mb-2">Age*</label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#Add0Da] border border-black  focus:outline-none placeholder:text-gray-800"
                placeholder='20'
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium mb-2">Date of Birth*</label>
              <input
                type="text"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#Add0Da] border border-black  focus:outline-none placeholder:text-gray-800"
                placeholder='00/00/00'
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium mb-2">Gender*</label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#Add0Da] border border-black  focus:outline-none placeholder:text-gray-800"
                placeholder='Gender'
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium mb-2">Oxymeter Heartbeat</label>
              <input
                type="text"
                name="oxymeterHeartbeat"
                value={formData.oxymeterHeartbeat}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#Add0Da] border border-black  focus:outline-none placeholder:text-gray-800"
                placeholder='000'
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-800 font-medium mb-2">Blood Type*</label>
              <input
                type="text"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#Add0Da] border border-black  focus:outline-none placeholder:text-gray-800"
                placeholder='O+'
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium mb-2">Height*</label>
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#Add0Da] border border-black  focus:outline-none placeholder:text-gray-800"
                placeholder='000cms'
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium mb-2">Weight*</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#Add0Da] border border-black  focus:outline-none placeholder:text-gray-800"
                placeholder='000kg'
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-800 font-medium mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#Add0Da] border border-black  focus:outline-none placeholder:text-gray-800"
                placeholder='Enter here'
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-800 font-medium mb-2">Blood Pressure*</label>
                <input
                  type="text"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#Add0Da] border border-black  focus:outline-none placeholder:text-gray-800"
                  placeholder='Do you face from BP issues?'
                />
              </div>
              <div>
                <label className="block text-gray-800 font-medium mb-2">Diabetes*</label>
                <input
                  type="text"
                  name="diabetes"
                  value={formData.diabetes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#Add0Da] border border-black  focus:outline-none placeholder:text-gray-800"
                  placeholder='Do you have Diabetes?'
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-2">Existing Medical Insurance</label>
            <input
              type="text"
              name="existingInsurance"
              placeholder="Enter Here"
              value={formData.existingInsurance}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#Add0Da] border border-black  focus:outline-none  placeholder-gray-700"
            />
          </div>
          <div className='flex justify-center pb-32'>
            <button className="px-32 py-3 bg-[#Add0Da] border border-black  focus:outline-none text-sm">submit</button>
          </div>
        </div>

      </div>
      <div className="absolute bottom-0 right-0 z-0 pointer-events-none">
        <img src={images.bottomWave} alt="bottomWave img"
          className="w-full h-auto" />
      </div>
    </div>
  );
};
export default TellUsAboutYourself;