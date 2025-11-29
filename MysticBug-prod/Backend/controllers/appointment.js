import { Appointment } from "../models/Appointment.js";

export const createAppointment = async (req, res) => {
  try {
    const { patientName, patientId, reason, doctor, date, timeSlot, age } = req.body;
    if (!date || !timeSlot || !reason || !age) {
      return res
        .status(400)
        .json({ message: "date, timeSlot, reason and age are required" });
    }

    // Convert string date to Date object
    const appointmentDate = new Date(date);

    const appt = new Appointment({
      patientName,
      age,
      reason,
      doctor,
      date: appointmentDate,
      timeSlot,
      patientId
    });

    await appt.save();
    console.log(appt)
    return res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment: appt
    });
  } catch (err) {
    console.error("Create appointment error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    })
  }
}
export const acceptAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'confirmed' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
export const rejectAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
// auto appointment rejection functionality function
const autoRejectExpiredAppointments = async () => {
  const now = new Date();

  const appointments = await Appointment.find({ status: "pending" });

  for (const appt of appointments) {
    const appointmentDate = new Date(appt.date);

    // Convert timeSlot to valid hours
    const [time, period] = appt.timeSlot.split(" ");
    let hours = parseInt(time);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    const expiryDateTime = new Date(
      appointmentDate.getFullYear(),
      appointmentDate.getMonth(),
      appointmentDate.getDate(),
      hours,
      0,
      0
    );

    if (expiryDateTime < now) {
      appt.status = "rejected";
      await appt.save();
    }
  }
};
export const fetchAllAppointments = async (req, res) => {
  try {
    await autoRejectExpiredAppointments();
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // Fetch all appointments from today onwards
    const appts = await Appointment.find({
      date: { $gte: todayStart },
    }).sort({ date: 1, timeSlot: 1 });

    // Convert "8 AM" etc to 24-hour number
    const parseTimeSlot = (timeSlot) => {
      const [time, period] = timeSlot.split(" ");
      let h = parseInt(time);
      if (period === "PM" && h !== 12) h += 12;
      if (period === "AM" && h === 12) h = 0;
      return h;
    };

    const activeAppointments = appts.filter((appt) => {
      const appointmentDate = new Date(appt.date);
      const appointmentHour = parseTimeSlot(appt.timeSlot);
      const appointmentDateTime = new Date(
        appointmentDate.getFullYear(),
        appointmentDate.getMonth(),
        appointmentDate.getDate(),
        appointmentHour,
        0,
        0
      );

      // Only filter out past hours for today
      const isToday =
        appointmentDate.getFullYear() === now.getFullYear() &&
        appointmentDate.getMonth() === now.getMonth() &&
        appointmentDate.getDate() === now.getDate();

      if (isToday) {
        return appointmentDateTime > now; // remaining hours today
      } else {
        return true; // all future appointments
      }
    });

    return res.json(activeAppointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
export const getAppointmentsByDateRange = async (req, res) => {
  try {
    await autoRejectExpiredAppointments();
    const { start, end } = req.query;
    if (!start || !end) {
      return res
        .status(400)
        .json({ message: "start and end query params required" });
    }
    const startDate = new Date(start);
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999);

    const appts = await Appointment.find({
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: 1, timeSlot: 1 });

    console.log("Filtered appointments:", appts.length);
    return res.status(200).json(appts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error " });
  }
}
export const todayAppointmentCount = async (req, res) => {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const count = await Appointment.countDocuments({
      date: { $gte: todayStart, $lt: todayEnd },
    });
    console.log("count:", count)
    res.json({ todaysAppointment: count });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
export const appointmentWithQueryParams = async (req, res) => {
  try {
    const { doctor, patientName } = req.query;

    console.log("Query params:", { doctor, patientName });

    let query = {};
    if (doctor) query.doctor = doctor;
    if (patientName) query.patientName = patientName;

    console.log("MongoDB query:", query);

    const appointments = await Appointment.find(query).sort({ date: -1 });

    console.log("Found appointments:", appointments.length);
    console.log("Sample appointment patientName:", appointments[0]?.patientName);

    res.json(appointments);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
}

export const getPatientsOfDoctor = async (req, res) => {
  try {
    const { doctorName } = req.params;
    const findPatientsofDoctor = await Appointment.find({ doctor: doctorName });
    if (findPatientsofDoctor.length === 0) {
      return res.status(404).json({ message: "no patients found" });
    }
    const uniquePatients = await Appointment.aggregate([
      { $match: { doctor: doctorName } },
      {
        $group: {
          _id: { patientName: "$patientName", age: "$age" },
          doc: { $first: "$$ROOT" }
        }
      },
      { $replaceRoot: { newRoot: "$doc" } }
    ]);
    res.status(200).json({ patients: uniquePatients })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getAppointmentHistory = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ date: -1 })
      .select('patientName doctor reason date ');

    const history = appointments.map(appointment => ({
      patientName: appointment.patientName,
      doctor: appointment.doctor,
      illness: appointment.reason,
      date: appointment.date,
    }));
    res.status(200).json({
      success: true,
      data: history
    });

  } catch (error) {
    console.error('Error fetching appointment history:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointment history',
      error: error.message
    });
  }
}