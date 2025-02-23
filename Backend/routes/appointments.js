const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Function to execute MySQL queries
const executeQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// ✅ **Route to book an appointment**
router.post("/book", async (req, res) => {
  try {
    const {
      name,
      specialization,
      date,
      time,
      medicalLicenseNumber,
      id,
    } = req.body;

    if (!medicalLicenseNumber || !id) {
      return res
        .status(400)
        .json({ error: "Doctor ID and Patient ID are required" });
    }

    console.log("Booking Appointment:", req.body); // Debugging

    const appointmentQuery = `
      INSERT INTO appointments (name, specialization, date, time, medicalLicenseNumber, id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await executeQuery(appointmentQuery, [
      name,
      specialization,
      date,
      time,
      medicalLicenseNumber,
     id,
    ]);

    console.log("✅ Appointment booked successfully!");

    res.status(200).json({ message: "Appointment booked successfully" });
  } catch (error) {
    console.error("❌ Error booking appointment:", error);
    res.status(500).json({ error: "Failed to book appointment" });
  }
});


// ✅ **Route to fetch appointments for a specific doctor**
router.get("/doctor/:medicalLicenseNumber", async (req, res) => {
  try {
    const { medicalLicenseNumber } = req.params;

    const sql = `
      SELECT * FROM appointments WHERE medicalLicenseNumber = ?
    `;

    const appointments = await executeQuery(sql, [medicalLicenseNumber]);

    res.status(200).json(appointments);
  } catch (error) {
    console.error("❌ Error fetching doctor appointments:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ **Route to fetch appointments for a specific patient**
router.get("/patient/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `
      SELECT * FROM appointments WHERE id = ?
    `;

    const appointments = await executeQuery(sql, [id]);

    res.status(200).json(appointments);
  } catch (error) {
    console.error("❌ Error fetching patient appointments:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
