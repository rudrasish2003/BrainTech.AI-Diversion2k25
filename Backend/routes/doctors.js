const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/db"); // Ensure this is your MySQL connection file

// Function to execute MySQL queries as a Promise
const executeQuery = (query, values) => {
  console.log("🛠️ Running Query:", query);
  console.log("🔢 With Values:", values);

  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("❌ Query Execution Error:", err);
        reject(err);
      } else {
        console.log("✅ Query Success:", result);
        resolve(result);
      }
    });
  });
};

// Route to add a new doctor profile
// Route to add a new doctor profile
router.post("/register", async (req, res) => {
  console.log("received data", req.body);
  try {
    const {
      bio,
      experience,
      degrees,
      specialization,
      email,
      phone,
      consDays,
      consDate,
      timeSlot,
      password,
    } = req.body;

    // Ensure required fields are provided
    if (
      !bio ||
      !experience ||
      !degrees ||
      !specialization ||
      !email ||
      !phone ||
      !password
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    // SQL query to insert the doctor profile into the database
    const sql = `INSERT INTO doctors 
        (bio, experience, degrees, specialization, email, phone, consDays, consDate, timeSlot, password) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      bio,
      experience,
      degrees,
      specialization,
      email,
      phone,
      consDays,
      consDate,
      timeSlot,
      hashedPassword, // Ensure that password is hashed before saving
    ];

    // Execute the query and log the result
    const result = await executeQuery(sql, values);
    console.log("Insert Result:", result);

    res.status(201).json({
      message: "Doctor profile added successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// 🏥 **Doctor Login**
// 🏥 **Doctor Login (Updated)**
router.post("/login", async (req, res) => {
  try {
    const { email, password, medicalLicenseNumber } = req.body;

    if (!email || !password || !medicalLicenseNumber) {
      return res.status(400).json({
        error: "Email, password, and medical license number are required",
      });
    }

    // Find doctor by email
    const sql = `SELECT * FROM doctors WHERE email = ?`;
    const doctors = await executeQuery(sql, [email]);

    if (doctors.length === 0) {
      return res.status(401).json({ error: "Doctor not found" });
    }

    const doctor = doctors[0];

    // Check if medical license number matches
    if (doctor.medicalLicenseNumber !== medicalLicenseNumber) {
      return res.status(401).json({ error: "Invalid Medical License Number" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Fetch doctor profile details
    const doctorProfile = {
      id: doctor.id,
      image: doctor.image,
      bio: doctor.bio,
      experience: doctor.experience,
      certificates: doctor.certificates,
      degrees: doctor.degrees,
      specialization: doctor.specialization,
      email: doctor.email,
      medicalLicenseNumber: doctor.medicalLicenseNumber,
    };

    res.status(200).json({
      message: "Login successful",
      token: "your-jwt-token", // Replace with actual JWT logic if needed
      doctorProfile, // Send doctor profile data
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🏥 **Get Doctor Profile by ID**
router.get("/appointments/:medicalLicenseNumber", (req, res) => {
  const { medicalLicenseNumber } = req.params;

  const query = `
    SELECT * FROM appointments WHERE medicalLicenseNumber = ?
  `;

  db.query(query, [medicalLicenseNumber], (err, results) => {
    if (err) {
      console.error("Error fetching appointments:", err);
      return res.status(500).json({ error: "Failed to fetch appointments" });
    }

    res.status(200).json(results);
  });
});

module.exports = router;
