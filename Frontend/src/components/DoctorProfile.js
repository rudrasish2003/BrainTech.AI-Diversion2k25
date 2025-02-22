import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

import {
  FaUpload,
  FaRegTrashAlt,
  FaCamera,
  FaUserMd,
  FaUsers,
  FaPrescription,
  FaSignOutAlt,
} from "react-icons/fa";
import DoctorMainProfile from "./DoctorMainProfile";

const DoctorProfile = () => {
  const navigate = useNavigate();
  // const [image, setImage] = useState(null);
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("");
  // const [certificates, setCertificates] = useState(null);
  const [email, setEmail] = useState(""); // Declare the email state variable
  const [phone, setPhone] = useState(""); // Declare phone state variable if needed
  const [password, setPassword] = useState("");
  const [degrees, setDegrees] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleCertificateUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   setCertificates((prevCertificates) => [...prevCertificates, ...files]);
  // };

  // const handleRemoveCertificate = (index) => {
  //   setCertificates((prevCertificates) =>
  //     prevCertificates.filter((_, i) => i !== index)
  //   );
  // };

  const handleRegister = async () => {
    const doctorData = {
      bio,
      experience,
      degrees,
      specialization,
      email, // Use the dynamic email input here
      phone, // Temporary, replace with input value
      password: "doctor123", // Temporary, replace with input value
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/doctors/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(doctorData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Doctor registered successfully:", result);
        setShowDashboard(true);
        localStorage.setItem("doctorData", JSON.stringify(doctorData)); // Save data to local storage
        navigate("/doctor-main-profile");
      } else {
        console.error("Error registering doctor:", result.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Doctor Profile</h1>

      <div style={styles.section}>
        <h2 style={styles.subHeader}>Upload Image</h2>
        <label style={styles.uploadLabel}>
          <FaCamera style={styles.icon} /> Click to Upload
          <input
            type="file"
            accept="image/*"
            // onChange={handleImageUpload}
            style={styles.fileInput}
          />
        </label>
        {/* {image && <img src={image} alt="Doctor" style={styles.image} />} */}
      </div>

      <div style={styles.section}>
        <h2 style={styles.subHeader}>Email</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={styles.input}
        />
      </div>

      <div style={styles.section}>
        <h2 style={styles.subHeader}>Phone Number</h2>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          style={styles.input}
        />
      </div>

      <div style={styles.section}>
        <h2 style={styles.subHeader}>Bio</h2>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Enter your bio"
          style={styles.textarea}
        />
      </div>

      <div style={styles.section}>
        <h2 style={styles.subHeader}>Experience</h2>
        <input
          type="text"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Enter your experience"
          style={styles.input}
        />
      </div>

      <div style={styles.section}>
        <h2 style={styles.subHeader}>Upload Certifications</h2>
        <label style={styles.uploadLabel}>
          <FaUpload style={styles.icon} /> Choose Files
          <input
            type="file"
            multiple
            // onChange={handleCertificateUpload}
            style={styles.fileInput}
          />
        </label>
        {/* <ul style={styles.certificateList}>
          {certificates.map((file, index) => (
            <li key={index} style={styles.certificateItem}>
              {file.name}
              <button
                onClick={() => handleRemoveCertificate(index)}
                style={styles.removeButton}
              >
                <FaRegTrashAlt />
              </button>
            </li>
          ))}
        </ul> */}
      </div>

      <div style={styles.section}>
        <h2 style={styles.subHeader}>Degrees</h2>
        <input
          type="text"
          value={degrees}
          onChange={(e) => setDegrees(e.target.value)}
          placeholder="Enter your degrees"
          style={styles.input}
        />
      </div>

      <div style={styles.section}>
        <h2 style={styles.subHeader}>Specialization</h2>
        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          style={styles.select}
        >
          <option value="">Select your specialization</option>
          <option value="cardiologist">Cardiologist</option>
          <option value="dermatologist">Dermatologist</option>
          <option value="neurologist">Neurologist</option>
          <option value="pediatrician">Pediatrician</option>
          <option value="orthopedic">Orthopedic</option>
          <option value="general practitioner">General Practitioner</option>
        </select>
      </div>

      <button onClick={handleRegister} style={styles.registerButton}>
        Register Profile
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
    animation: "fadeIn 0.6s ease-in-out",
  },
  header: {
    textAlign: "center",
    color: "#4A90E2",
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  subHeader: {
    color: "#4A90E2",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  section: {
    marginBottom: "20px",
  },
  image: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginTop: "10px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    backgroundColor: "#f9f9f9",
    boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.1)",
    transition: "border-color 0.3s",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    backgroundColor: "#f9f9f9",
    boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.1)",
    transition: "border-color 0.3s",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    fontSize: "16px",
  },
  fileInput: {
    display: "none",
  },
  uploadLabel: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    color: "#fff",
    padding: "8px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
  icon: {
    marginRight: "8px",
    fontSize: "18px",
  },
  certificateList: {
    listStyleType: "none",
    padding: 0,
    marginTop: "10px",
  },
  certificateItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 0",
    fontSize: "14px",
  },
  removeButton: {
    backgroundColor: "#FF4D4D",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "12px",
  },
  registerButton: {
    width: "100%",
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "20px",
    ":hover": {
      backgroundColor: "#45a049",
    },
  },
};

export default DoctorProfile;
