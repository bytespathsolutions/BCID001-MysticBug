import { User } from "../models/user.js"
import { Appointment } from "../models/Appointment.js"
export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params
    const doctorUid = await User.findById({ _id: id })
    res.status(200).json({ doctorId: doctorUid.uid })
  } catch (error) {
    console.log("error while fetching doctor uid")
    res.status(500).json({ error: "error while fetching doctor uid" })
  }
}

export const fetchDoctors = async (req, res) => {
  try {
    const doctorsData = await User.find({ userType: 'doctor' }).select('uid name email specialization isActive experience').lean();

    res.status(200).json({ doctors: doctorsData })
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const getCountOfActiveDoctors = async (req, res) => {
  try {
    const doctorsData = await User.countDocuments({ userType: 'doctor', isActive: true })
    res.status(200).json({ activeDoctorsCount: doctorsData })
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const getPatientsofDoctor = async (req, res) => {
  try {
    const { uid } = req.params;
    console.log("uid:", uid)
    const doctor = await User.findOne({ uid, userType: "doctor" });
    if (!doctor) {
      return res.status(400).json({ error: "Invalid doctor ID" });
    }
    const uniquePatients = await Appointment.aggregate([
      { $match: { doctor: doctor.name } },
      {
        $group: {
          _id: "$patientId",
          patientName: { $first: "$patientName" },
          age: { $first: "$age" },
          date: { $first: "$date" },
          uid: { $first: "$patientId" },
          doctor: { $first: "$doctor" }
        }
      },
      {
        $project: {
          patientName: 1,
          age: 1,
          date: 1,
          uid: 1,
          doctor: 1
        }
      }
    ]);
    res.status(200).json({ patients: uniquePatients });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: error.message });
  }
}

export const getDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params
    const doctor = await User.findOne({ uid: doctorId })
    if (!doctor) {
      return res.status(404).json({ message: "doctor not found" })
    }
    res.status(200).json({ success: true, message: doctor })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}