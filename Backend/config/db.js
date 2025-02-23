const mysql = require("mysql");

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change this to your MySQL user
  password: "", // Your MySQL password
  database: "alzheimer", // ✅ Use the existing database
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL Database (alzheimer)");
});

// ✅ Ensure the `patients` table exists
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    contact VARCHAR(20) NOT NULL,
    medical_history TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

db.query(createTableQuery, (err) => {
  if (err) console.error("❌ Error creating patients table:", err);
  // else console.log("✅ Patients table is ready inside 'alzheimer' database!");
});

module.exports = db;
