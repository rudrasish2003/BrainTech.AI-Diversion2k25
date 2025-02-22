import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Mail,
  Lock,
  ArrowLeft,
  UserCircle,
  Stethoscope,
  Brain,
} from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    medicalLicenseNumber: "",
  });
  const [step, setStep] = useState("role");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.role) {
      toast.error("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (formData.role === "doctor" && !formData.medicalLicenseNumber) {
      toast.error("Medical License Number is required for doctors.");
      return;
    }

    const requestBody = {
      email: formData.email,
      password: formData.password,
      userType: formData.role,
      medicalLicenseNumber:
        formData.role === "doctor" ? formData.medicalLicenseNumber : null,
    };

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        toast.success("Registration successful! Please log in.");
        if (formData.role === "patient") {
          navigate("/patient-profile");
        } else if (formData.role === "doctor") {
          navigate("/doctor-profile");
        }
      } else {
        toast.error(data?.message || "Registration failed.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
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
              <h2 style={styles.heading}>Join Alzheimer's Detect</h2>
              <p style={styles.subheading}>
                Please select your role to begin registration
              </p>
              <div style={styles.form}>
                <button
                  type="button"
                  style={styles.roleButton(formData.role === "patient")}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, role: "patient" }));
                    setStep("details");
                  }}
                >
                  <UserCircle size={24} />
                  <span>Register as Patient</span>
                </button>
                <button
                  type="button"
                  style={styles.roleButton(formData.role === "doctor")}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, role: "doctor" }));
                    setStep("details");
                  }}
                >
                  <Stethoscope size={24} />
                  <span>Register as Doctor</span>
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
                  setFormData((prev) => ({ ...prev, role: "" }));
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
              <h2 style={styles.heading}>Create Your Account</h2>
              <p style={styles.subheading}>
                {formData.role === "patient"
                  ? "Patient Registration"
                  : "Healthcare Provider Registration"}
              </p>
              <form onSubmit={handleRegister} style={styles.form}>
                <div style={styles.inputWrapper}>
                  <Mail style={styles.icon} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    required
                    style={styles.input}
                    disabled={isLoading}
                  />
                </div>
                <div style={styles.inputWrapper}>
                  <Lock style={styles.icon} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create Password"
                    required
                    style={styles.input}
                    disabled={isLoading}
                  />
                </div>
                <div style={styles.inputWrapper}>
                  <Lock style={styles.icon} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                    required
                    style={styles.input}
                    disabled={isLoading}
                  />
                </div>

                {formData.role === "doctor" && (
                  <div style={styles.inputWrapper}>
                    <Stethoscope style={styles.icon} />
                    <input
                      type="text"
                      name="medicalLicenseNumber"
                      value={formData.medicalLicenseNumber}
                      onChange={handleInputChange}
                      placeholder="Medical License Number"
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
                    "Creating Account..."
                  ) : (
                    <>
                      <UserCircle size={20} />
                      <span>Create Account</span>
                    </>
                  )}
                </button>
              </form>

              <div style={styles.loginSection}>
                <p style={styles.loginText}>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    style={styles.loginButton}
                  >
                    Sign in here
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
    opacity: "0.51",
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
    width: "150%",
    maxWidth: "440px",
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
    width: "80%",
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
    "&:hover": {
      backgroundColor: "#4338ca",
    },
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "transparent",
    color: "#4f46e5",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    marginBottom: "1rem",
  },
  loginSection: {
    marginTop: "2rem",
    textAlign: "center",
  },
  loginText: {
    color: "#6b7280",
    fontSize: "1rem",
  },
  loginButton: {
    color: "#4f46e5",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Register;
