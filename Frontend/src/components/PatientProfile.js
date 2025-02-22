import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Weight,
  Ruler,
  Heart,
  Activity,
  Upload,
  MapPin,
} from "lucide-react";

const styles = {
  container: {
    minHeight: "100vh",
    padding: "2rem 1rem",
    background: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  },
  wrapper: {
    maxWidth: "64rem",
    margin: "0 auto",
  },
  card: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "1rem",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(226, 232, 240, 0.8)",
    padding: "2rem",
  },
  header: {
    marginBottom: "2rem",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    background: "linear-gradient(to right, #2563eb, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#64748b",
    marginTop: "0.5rem",
  },
  imageUpload: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  imageContainer: {
    width: "18rem",
    height: "18em",
    borderRadius: "50%",
    background: "linear-gradient(145deg, #f8fafc, #f1f5f9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "3px solid #3b82f6",
    cursor: "pointer",
    transition: "all 0.3s ease",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(59, 130, 246, 0.2)",
    position: "relative",
  },
  imageLabel: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    background: "rgba(59, 130, 246, 0.9)",
    color: "#fff",
    textAlign: "center",
    padding: "0.25rem",
    fontSize: "0.75rem",
    fontWeight: "500",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "50%",
    filter: "brightness(1.05)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "2rem",
    marginBottom: "2rem",
  },
  inputGroup: {
    position: "relative",
    marginBottom: "1.5rem",
  },
  icon: {
    position: "absolute",
    left: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#3b82f6",
  },
  input: {
    width: "80%",
    padding: "1rem 1rem 1rem 3rem",
    borderRadius: "0.75rem",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    color: "#1e293b",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    outline: "none",
    "&:focus": {
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)",
      background: "#ffffff",
    },
    "&::placeholder": {
      color: "#94a3b8",
    },
  },
  select: {
    width: "100%",
    padding: "1rem 1rem 1rem 3rem",
    borderRadius: "0.75rem",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    color: "#1e293b",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    outline: "none",
    cursor: "pointer",
    appearance: "none",
    "&:focus": {
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)",
      background: "#ffffff",
    },
  },
  textarea: {
    width: "80%",
    padding: "1rem 1rem 1rem 3rem",
    borderRadius: "0.75rem",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    color: "#1e293b",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    outline: "none",
    resize: "vertical",
    minHeight: "8rem",
    "&:focus": {
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)",
      background: "#ffffff",
    },
    "&::placeholder": {
      color: "#94a3b8",
    },
  },
  button: {
    padding: "1rem 2.5rem",
    borderRadius: "0.75rem",
    background: "linear-gradient(to right, #2563eb, #3b82f6)",
    color: "#ffffff",
    fontSize: "1.1rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(59, 130, 246, 0.4)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
  },
  label: {
    color: "#475569",
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
    display: "block",
    fontWeight: "500",
  },
};

const PatientProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profileImage: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    height: "",
    weight: "",
    bloodGroup: "",
    address: "",
    medicalHistory: "",
    allergies: "",
    currentMedications: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/patients/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Patient added successfully:", data);

      // Navigate after successful submission
      navigate("/patient-dashboard", { state: { patientData: formData } });
    } catch (error) {
      console.error("❌ Error sending data:", error);
      alert("Failed to add patient. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setFormData({ ...formData, profileImage: url });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <div style={styles.header}>
            <h1 style={styles.title}>Welcome to HealthCare Portal</h1>
            <p style={styles.subtitle}>
              Let's create your digital health profile
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={styles.imageUpload}>
              <label htmlFor="profileImage" style={styles.imageContainer}>
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt="Profile"
                    style={styles.image}
                  />
                ) : (
                  <Upload size={40} color="#3b82f6" />
                )}
                <div style={styles.imageLabel}>Upload Profile Picture</div>
                <input
                  id="profileImage"
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div style={styles.grid}>
              <div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>First Name</label>
                  <User style={styles.icon} size={20} />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    style={styles.input}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email Address</label>
                  <Mail style={styles.icon} size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    style={styles.input}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Date of Birth</label>
                  <Calendar style={styles.icon} size={20} />
                  <input
                    type="date"
                    name="dob"
                    style={styles.input}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Weight (kg)</label>
                  <Weight style={styles.icon} size={20} />
                  <input
                    type="number"
                    name="weight"
                    placeholder="Enter your weight"
                    style={styles.input}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Last Name</label>
                  <User style={styles.icon} size={20} />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    style={styles.input}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Phone Number</label>
                  <Phone style={styles.icon} size={20} />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    style={styles.input}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Blood Group</label>
                  <Heart style={styles.icon} size={20} />
                  <select
                    name="bloodGroup"
                    style={styles.select}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Height (cm)</label>
                  <Ruler style={styles.icon} size={20} />
                  <input
                    type="number"
                    name="height"
                    placeholder="Enter your height"
                    style={styles.input}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Medical History</label>
              <Activity style={{ ...styles.icon, top: "2.5rem" }} size={20} />
              <textarea
                name="medicalHistory"
                placeholder="Please share any relevant medical history"
                style={styles.textarea}
                onChange={handleChange}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Address</label>
              <MapPin style={{ ...styles.icon, top: "2.5rem" }} size={20} />
              <textarea
                name="address"
                placeholder="Enter your full address"
                style={styles.textarea}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.buttonContainer}>
              <button type="submit" style={styles.button}>
                Create Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
