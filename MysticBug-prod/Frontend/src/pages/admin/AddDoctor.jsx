import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddDoctor = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    doctorName: '',
    qualifications: '',
    designation: '',
    typeOfDoctor: '',
    specialistDetails: '',
    experience: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.doctorName || !formData.email || !formData.password) {
      setError('Doctor name, email, and password are required');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/admin/add-doctor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.doctorName,
          email: formData.email,
          password: formData.password,
          qualification: formData.qualifications,
          designation: formData.designation,
          typeOfDoctor: formData.typeOfDoctor,
          specialistDetails: formData.specialistDetails,
          experience: formData.experience,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add doctor');
      }

      setSuccess('Doctor added successfully! They can now login.');

      // Reset form
      setFormData({
        doctorName: '',
        qualifications: '',
        designation: '',
        typeOfDoctor: '',
        specialistDetails: '',
        experience: '',
        email: '',
        password: '',
      });

      // Navigate back after 2 seconds
      setTimeout(() => {
        navigate('/admin-dashboard/doctors');
      }, 2000);

    } catch (err) {
      setError(err.message || 'Failed to add doctor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-[#d1e8f3] min-h-screen overflow-auto p-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-gray-800'>Add New Doctor</h1>
        <button
          onClick={() => navigate('/admin-dashboard/doctors')}
          className='px-3 py-1 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition'
        >
          Go Back
        </button>
      </div>

      {error && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        <div className="flex flex-col">
          <label htmlFor="doctorName" className="mb-1 font-medium">
            Doctor Name *
          </label>
          <input
            type="text"
            id="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            className="p-3 outline-none bg-white placeholder:text-[#4D8799] rounded-md"
            placeholder="Enter doctor's full name"
            required
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="qualifications" className="mb-1 font-medium">
            Qualifications
          </label>
          <input
            type="text"
            id="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            className="p-3 outline-none bg-white placeholder:text-[#4D8799] rounded-md"
            placeholder="e.g., MD, MBBS"
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="designation" className="mb-1 font-medium">
            Designation
          </label>
          <input
            type="text"
            id="designation"
            value={formData.designation}
            onChange={handleChange}
            className="p-3 outline-none bg-white placeholder:text-[#4D8799] rounded-md"
            placeholder="e.g., Senior Consultant"
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="typeOfDoctor" className="mb-1 font-medium">
            Type of Doctor
          </label>
          <input
            type="text"
            id="typeOfDoctor"
            value={formData.typeOfDoctor}
            onChange={handleChange}
            className="p-3 outline-none bg-white placeholder:text-[#4D8799] rounded-md"
            placeholder="e.g., Oncology, Cardiology"
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="specialistDetails" className="mb-1 font-medium">
            Specialist Details
          </label>
          <input
            type="text"
            id="specialistDetails"
            value={formData.specialistDetails}
            onChange={handleChange}
            className="p-3 outline-none bg-white placeholder:text-[#4D8799] rounded-md"
            placeholder="e.g., Pediatric Oncology, Interventional Cardiology"
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="experience" className="mb-1 font-medium">
            Years of Experience
          </label>
          <input
            type="number"
            id="experience"
            value={formData.experience}
            onChange={handleChange}
            className="p-3 outline-none bg-white placeholder:text-[#4D8799] rounded-md"
            placeholder="Enter years"
            min={0}
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium">
            Email *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 outline-none bg-white placeholder:text-[#4D8799] rounded-md"
            placeholder="example@gmail.com"
            required
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-medium">
            Password *
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 outline-none bg-white placeholder:text-[#4D8799] rounded-md"
            placeholder="At least 6 characters"
            required
            disabled={loading}
          />
        </div>

        <div className="col-span-full flex justify-center mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-md shadow-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding Doctor...' : 'Add Doctor'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddDoctor