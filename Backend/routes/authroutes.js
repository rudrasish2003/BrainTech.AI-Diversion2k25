const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // Adjust path if needed

const SECRET_KEY = "your_secret_key"; // Change this to a secure key

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { email, password, userType, medicalLicenseNumber } = req.body;

    if (!email || !password || !userType) {
      console.log("❌ Registration failed: Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("📩 Received registration data:", req.body);

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("❌ Database error during SELECT:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }

        if (results.length > 0) {
          console.log("⚠️ Email already exists:", email);
          return res.status(400).json({ message: "Email already in use" });
        }

        // Ensure doctors provide a medical license number
        if (userType === "doctor" && !medicalLicenseNumber) {
          console.log(
            "❌ Doctor registration failed: No license number provided"
          );
          return res.status(400).json({
            message: "Medical License Number is required for doctors",
          });
        }

        console.log("🔐 Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log(" Inserting new user into the database...");
        db.query(
          "INSERT INTO users (email, password, userType, medicalLicenseNumber) VALUES (?, ?, ?, ?)",
          [
            email,
            hashedPassword,
            userType,
            userType === "doctor" ? medicalLicenseNumber : null,
          ],
          (err, result) => {
            if (err) {
              if (err.code === "ER_DUP_ENTRY") {
                console.log("⚠️ Duplicate entry detected:", email);
                return res
                  .status(400)
                  .json({ message: "Email already exists" });
              }
              console.error("❌ Database INSERT error:", err);
              return res
                .status(500)
                .json({ message: "Database error", error: err });
            }
            console.log("✅ User registered successfully:", email);
            res.status(201).json({ message: "User registered successfully" });
          }
        );
      }
    );
  } catch (error) {
    console.error("❌ Unexpected Server Error:", error);
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
});

// Login Route
router.post("/login", (req, res) => {
  const { email, password, userType, medicalLicenseNumber } = req.body;

  if (!email || !password || !userType) {
    console.log("❌ Login failed: Missing required fields");
    return res.status(400).json({ message: "All fields are required" });
  }

  console.log("🔑 Login attempt:", { email, userType, medicalLicenseNumber });

  db.query(
    "SELECT * FROM users WHERE email = ? AND userType = ?",
    [email, userType],
    async (err, results) => {
      if (err) {
        console.error("❌ Database error during login:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (results.length === 0) {
        console.log("⚠️ User not found or invalid credentials:", email);
        return res
          .status(400)
          .json({ message: "User not found or invalid credentials" });
      }

      const user = results[0];

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("⚠️ Incorrect password for:", email);
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Log stored and provided medical license numbers
      console.log("📌 Stored License:", `"${user.medicalLicenseNumber}"`);
      console.log("📌 Provided License:", `"${medicalLicenseNumber}"`);

      // Normalize license number comparison
      if (
        userType === "doctor" &&
        user.medicalLicenseNumber.trim() !== medicalLicenseNumber.trim()
      ) {
        console.log("⚠️ Invalid medical license number for:", email);
        return res
          .status(400)
          .json({ message: "Invalid Medical License Number" });
      }

      // Generate JWT Token
      console.log("✅ Login successful, generating token...");
      const token = jwt.sign(
        { id: user.id, email: user.email, userType: user.userType },
        SECRET_KEY,
        { expiresIn: "7d" }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          userType: user.userType,
          medicalLicenseNumber: user.medicalLicenseNumber || null,
        },
      });
    }
  );
});

module.exports = router;
