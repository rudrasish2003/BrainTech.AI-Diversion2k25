import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Mail,
  Lock,
  LogIn,
  UserCircle,
  Stethoscope,
  ArrowLeft,
  Brain,
} from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [step, setStep] = useState("role");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email || !password) {
        toast.error("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      if (role === "doctor" && !doctorId) {
        toast.error("Please enter your Doctor ID");
        setIsLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          userType: role,
          medicalLicenseNumber: doctorId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful! Welcome back.");

        // Store token and userType in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", role);
        localStorage.setItem("userEmail", email);

        if (role === "doctor") {
          // Store doctor profile in localStorage
          localStorage.setItem(
            "doctorProfile",
            JSON.stringify(data.doctorProfile)
          );

          // Navigate to doctor dashboard with fetched profile
          navigate("/doctor-main-profile", {
            state: { doctorData: data.doctorProfile },
          });
        } else {
          fetchPatientProfile(email);
        }
      } else {
        toast.error(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch patient profile
  const fetchPatientProfile = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/patients/profile?email=${email}`
      );
      const result = await response.json();

      if (response.ok) {
        // Redirect to patient dashboard with fetched data
        navigate("/patient-dashboard", { state: { patientData: result } });
      } else {
        console.error("Error fetching patient data:", result.error);
      }
    } catch (error) {
      console.error("Network error while fetching patient data:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundOverlay}></div>
      <div style={styles.card}>
        <div style={styles.cardContent}>
          {step === "role" ? (
            <>
              <div style={styles.logoContainer}>
                <div style={styles.logo}>
                  <Brain size={40} style={styles.logoIcon} />
                </div>
              </div>
              <h2 style={styles.heading}>Welcome to Alzheimer's Detect</h2>
              <p style={styles.subheading}>
                Please select your role to continue
              </p>
              <div style={styles.form}>
                <button
                  type="button"
                  style={styles.roleButton(role === "patient")}
                  onClick={() => {
                    setRole("patient");
                    setStep("credentials");
                  }}
                >
                  <UserCircle size={24} />
                  <span>I'm a Patient</span>
                </button>
                <button
                  type="button"
                  style={styles.roleButton(role === "doctor")}
                  onClick={() => {
                    setRole("doctor");
                    setStep("credentials");
                  }}
                >
                  <Stethoscope size={24} />
                  <span>I'm a Doctor</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                style={styles.backButton}
                onClick={() => {
                  setStep("role");
                  setRole("");
                  setEmail("");
                  setPassword("");
                  setDoctorId("");
                }}
              >
                <ArrowLeft size={16} />
                <span>Back to Role Selection</span>
              </button>
              <div style={styles.logoContainer}>
                <div style={styles.logo}>
                  <Brain size={40} style={styles.logoIcon} />
                </div>
              </div>
              <h2 style={styles.heading}>Welcome Back</h2>
              <p style={styles.subheading}>
                {role === "patient"
                  ? "Patient Access Portal"
                  : "Healthcare Provider Portal"}
              </p>
              <form onSubmit={handleLogin} style={styles.form}>
                <div style={styles.inputWrapper}>
                  <Mail style={styles.icon} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    style={styles.input}
                    disabled={isLoading}
                  />
                </div>
                <div style={styles.inputWrapper}>
                  <Lock style={styles.icon} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    style={styles.input}
                    disabled={isLoading}
                  />
                </div>
                {role === "doctor" && (
                  <div style={styles.inputWrapper}>
                    <Stethoscope style={styles.icon} />
                    <input
                      type="text"
                      value={doctorId}
                      onChange={(e) => setDoctorId(e.target.value)}
                      placeholder="Enter your Doctor ID"
                      required
                      style={styles.input}
                      disabled={isLoading}
                    />
                  </div>
                )}
                <button
                  type="submit"
                  style={styles.button}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Authenticating..."
                  ) : (
                    <>
                      <LogIn size={20} />
                      <span>Sign In Securely</span>
                    </>
                  )}
                </button>
              </form>

              <div style={styles.registerSection}>
                <p style={styles.registerText}>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    style={styles.registerButton}
                  >
                    Register here
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(147, 197, 253, 0.1) 100%)",
    position: "relative",
    overflow: "hidden",
    padding: "2rem",
  },
  backgroundOverlay: {
    position: "absolute",
    inset: "0",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=2000&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: "0.55",
    "&::before": {
      content: "''",
      position: "absolute",
      inset: "0",
      background:
        "radial-gradient(circle at center, transparent 0%, #f8fafc 70%)",
    },
  },
  card: {
    position: "relative",
    width: "100%",
    maxWidth: "440px",
    height: "80%",
    background: "rgba(255, 255, 255, 0.98)",
    borderRadius: "1.5rem",
    boxShadow:
      "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 -8px 24px -12px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
    border: "1px solid rgba(79, 70, 229, 0.1)",
    backdropFilter: "blur(180px)",
    transform: "translateY(0)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow:
        "0 30px 60px -12px rgba(0, 0, 0, 0.2), 0 -12px 36px -12px rgba(0, 0, 0, 0.08)",
    },
  },
  cardContent: {
    padding: "2.5rem",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  logo: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 12px 24px -4px rgba(79, 70, 229, 0.3)",
  },
  logoIcon: {
    color: "white",
    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #1e1b4b 0%, #4f46e5 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "1rem",
    letterSpacing: "-0.025em",
  },
  subheading: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "1.125rem",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  roleButton: (isSelected) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    backgroundColor: isSelected ? "#4f46e5" : "white",
    color: isSelected ? "white" : "#1e1b4b",
    padding: "1.25rem",
    borderRadius: "1rem",
    fontWeight: "600",
    fontSize: "1.125rem",
    cursor: "pointer",
    border: "2px solid",
    borderColor: isSelected ? "#4f46e5" : "rgba(79, 70, 229, 0.2)",
    transition: "all 0.3s ease",
    boxShadow: isSelected
      ? "0 12px 24px -4px rgba(79, 70, 229, 0.3)"
      : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 20px 40px -8px rgba(79, 70, 229, 0.4)",
      backgroundColor: isSelected ? "#4338ca" : "rgba(79, 70, 229, 0.05)",
    },
  }),
  inputWrapper: {
    position: "relative",
    width: "100%",
  },
  input: {
    width: "70%",
    padding: "1rem 1rem 1rem 3rem",
    borderRadius: "1rem",
    backgroundColor: "white",
    border: "2px solid rgba(79, 70, 229, 0.2)",
    color: "#1e1b4b",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    outline: "none",
    "&:focus": {
      borderColor: "#4f46e5",
      boxShadow: "0 0 0 4px rgba(79, 70, 229, 0.1)",
    },
  },
  icon: {
    position: "absolute",
    left: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#6b7280",
    transition: "color 0.3s ease",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    backgroundColor: "#4f46e5",
    color: "white",
    padding: "1.25rem",
    borderRadius: "1rem",
    fontWeight: "600",
    fontSize: "1.125rem",
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s ease",
    boxShadow: "0 12px 24px -4px rgba(79, 70, 229, 0.3)",
    "&:hover": {
      backgroundColor: "#4338ca",
      transform: "translateY(-2px)",
      boxShadow: "0 20px 40px -8px rgba(79, 70, 229, 0.4)",
    },
    "&:disabled": {
      backgroundColor: "#818cf8",
      cursor: "not-allowed",
      transform: "none",
    },
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "none",
    border: "none",
    color: "#6b7280",
    fontSize: "0.875rem",
    cursor: "pointer",
    marginBottom: "2rem",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#4f46e5",
      background: "rgba(79, 70, 229, 0.05)",
    },
  },
  registerSection: {
    textAlign: "center",
    marginTop: "2rem",
    padding: "1rem",
    borderTop: "1px solid rgba(79, 70, 229, 0.1)",
  },
  registerText: {
    color: "#6b7280",
    fontSize: "0.875rem",
  },
  registerButton: {
    background: "none",
    border: "none",
    color: "#4f46e5",
    fontWeight: "600",
    cursor: "pointer",
    transition: "color 0.3s ease",
    "&:hover": {
      color: "#4338ca",
      textDecoration: "underline",
    },
  },
};

export default LoginPage;
