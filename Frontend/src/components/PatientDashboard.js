import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  User,
  UserCircle,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Heart,
  Weight,
  Ruler,
} from "lucide-react";
import AppointmentDetailsModal from "./AppointmentDetailsModal";

const PatientDashboard = () => {
  const location = useLocation();
  const [patientData, setPatientData] = useState(
    location.state?.patientData || {}
  );
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // Fetch patient data on component mount
  useEffect(() => {
    const fetchPatientData = async () => {
      const storedEmail = localStorage.getItem("userEmail");

      if (!storedEmail) return;

      try {
        const response = await fetch(
          `http://localhost:5000/api/patients/profile?email=${storedEmail}`
        );
        const result = await response.json();

        if (response.ok) {
          setPatientData(result);
        } else {
          console.error("Error fetching patient data:", result.error);
        }
      } catch (error) {
        console.error("Network error while fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, []); // Runs only once when the component mounts

  const handleBookAppointment = () => {
    setShowModal(true);
  };

  const handleAppointmentBooked = (appointmentDetails) => {
    setAppointments((prev) => [...prev, appointmentDetails]);
    setShowModal(false);
  };

  const formatAppointmentDate = (date) => {
    const appointmentDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (appointmentDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (appointmentDate.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return appointmentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  // Helper function for handling profile image
  const getImageUrl = (imageUrl) => {
    if (!imageUrl || imageUrl === "undefined") {
      return null;
    }
    return imageUrl;
  };

  const renderProfileImage = () => {
    const imageUrl = getImageUrl(patientData?.profileImage);
    if (imageUrl) {
      return (
        <img
          src={imageUrl}
          alt="Profile"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      );
    }
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <UserCircle size={48} color="#9ca3af" />
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFF5E1", // Light warm color (soft beige)
        padding: "2rem 1rem",
      }}
    >
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "2rem",
          }}
        >
          <div>
            <div
              style={{
                backgroundColor: "#FFE4B5", // Light warm color for the card (light peach)
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "8rem",
                    height: "8rem",
                    borderRadius: "50%",
                    overflow: "hidden",
                    marginBottom: "1rem",
                  }}
                >
                  {renderProfileImage()}
                </div>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#111827",
                    marginBottom: "0.5rem",
                  }}
                >
                  {patientData.firstName} {patientData.lastName}
                </h2>
                <p
                  style={{
                    color: "#6b7280",
                    marginBottom: "1.5rem",
                  }}
                >
                  Patient ID: #12345
                </p>

                <button
                  onClick={handleBookAppointment}
                  style={{
                    backgroundColor: "#2563eb",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    width: "100%",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                >
                  Book Appointment
                </button>

                <div
                  style={{
                    marginTop: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#4b5563",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <Mail
                      size={20}
                      style={{ marginRight: "0.75rem", color: "#6b7280" }}
                    />
                    <span>{patientData.email}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#4b5563",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <Phone
                      size={20}
                      style={{ marginRight: "0.75rem", color: "#6b7280" }}
                    />
                    <span>{patientData.phone}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#4b5563",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <MapPin
                      size={20}
                      style={{ marginRight: "0.75rem", color: "#6b7280" }}
                    />
                    <span>{patientData.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div
              style={{
                backgroundColor: "#FFE4B5", // Light warm color for the card (light peach)
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#111827",
                  marginBottom: "1rem",
                }}
              >
                Medical Information
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "1rem",
                    backgroundColor: "#f9fafb",
                    borderRadius: "0.5rem",
                  }}
                >
                  <Heart
                    size={24}
                    style={{ marginRight: "0.75rem", color: "#ef4444" }}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#6b7280",
                      }}
                    >
                      Blood Group
                    </p>
                    <p
                      style={{
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      {patientData.bloodGroup}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "1rem",
                    backgroundColor: "#f9fafb",
                    borderRadius: "0.5rem",
                  }}
                >
                  <Weight
                    size={24}
                    style={{ marginRight: "0.75rem", color: "#3b82f6" }}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#6b7280",
                      }}
                    >
                      Weight
                    </p>
                    <p
                      style={{
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      {patientData.weight} kg
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "1rem",
                    backgroundColor: "#f9fafb",
                    borderRadius: "0.5rem",
                  }}
                >
                  <Ruler
                    size={24}
                    style={{ marginRight: "0.75rem", color: "#10b981" }}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#6b7280",
                      }}
                    >
                      Height
                    </p>
                    <p
                      style={{
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      {patientData.height} cm
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "1rem",
                    backgroundColor: "#f9fafb",
                    borderRadius: "0.5rem",
                  }}
                >
                  <Calendar
                    size={24}
                    style={{ marginRight: "0.75rem", color: "#8b5cf6" }}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#6b7280",
                      }}
                    >
                      Date of Birth
                    </p>
                    <p
                      style={{
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      {patientData.dob}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Appointments Section */}
            <div
              style={{
                backgroundColor: "#FFE4B5", // Light warm color for the card (light peach)
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#111827",
                  marginBottom: "1rem",
                }}
              >
                Upcoming Appointments
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {appointments.length > 0 ? (
                  appointments.map((appointment, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                        backgroundColor: "#e0f7fa",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.2s",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Calendar
                          size={24}
                          style={{ marginRight: "0.75rem", color: "#00796b" }}
                        />
                        <div>
                          <p
                            style={{
                              fontWeight: "600",
                              color: "#00796b",
                              fontSize: "1rem",
                            }}
                          >
                            {appointment.specialization}
                          </p>
                          <p
                            style={{
                              fontSize: "0.875rem",
                              color: "#4b5563",
                            }}
                          >
                            {appointment.doctorName}
                          </p>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p
                          style={{
                            fontWeight: "600",
                            color: "#111827",
                          }}
                        >
                          {formatAppointmentDate(appointment.date)}
                        </p>
                        <p
                          style={{
                            fontSize: "0.875rem",
                            color: "#6b7280",
                          }}
                        >
                          {appointment.time}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p
                    style={{
                      color: "#6b7280",
                      textAlign: "center",
                      padding: "1rem",
                    }}
                  >
                    No upcoming appointments
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <AppointmentDetailsModal
          onAppointmentBooked={handleAppointmentBooked}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default PatientDashboard;
