import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  UserCircle,
  User,
  Users,
  FileText,
  LogOut,
  Search,
  PlusCircle,
} from "lucide-react";

const DoctorMainProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [doctorData, setDoctorData] = useState(
    location.state?.doctorData || {}
  );

  useEffect(() => {
    const storedDoctorData = localStorage.getItem("doctorData");
    if (storedDoctorData) {
      setDoctorData(JSON.parse(storedDoctorData));
    }
  }, []);

  const [activeTab, setActiveTab] = useState("profile");
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Dummy patient data (replace with backend data)
  const patients = [
    {
      id: 1,
      name: "John Doe",
      age: 45,
      condition: "Hypertension",
      lastVisit: "2024-03-15",
      status: "Regular",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 32,
      condition: "Diabetes",
      lastVisit: "2024-03-14",
      status: "Critical",
    },
    {
      id: 3,
      name: "Mike Johnson",
      age: 28,
      condition: "Asthma",
      lastVisit: "2024-03-10",
      status: "Stable",
    },
    {
      id: 4,
      name: "Sarah Williams",
      age: 52,
      condition: "Arthritis",
      lastVisit: "2024-03-08",
      status: "Regular",
    },
    {
      id: 5,
      name: "Robert Brown",
      age: 39,
      condition: "Migraine",
      lastVisit: "2024-03-05",
      status: "Stable",
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "critical":
        return "#FF4757"; // Red for critical
      case "stable":
        return "#4CAF50"; // Green for stable
      default:
        return "#4A90E2"; // Blue for regular
    }
  };

  const PrescriptionForm = () => (
    <div style={styles.prescriptionForm}>
      <div style={styles.prescriptionFormHeader}>
        <h3 style={styles.prescriptionHeader}>New Prescription</h3>
        <div style={styles.patientSummary}>
          <div style={styles.patientSummaryInfo}>
            <h4>{selectedPatient.name}</h4>
            <span>
              Age: {selectedPatient.age} | Condition:{" "}
              {selectedPatient.condition}
            </span>
          </div>
          <div style={styles.patientStatus}>
            <span
              style={{
                ...styles.statusBadge,
                backgroundColor: getStatusColor(selectedPatient.status),
              }}
            >
              {selectedPatient.status}
            </span>
          </div>
        </div>
      </div>
      <div style={styles.prescriptionFormGrid}>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Diagnosis</label>
          <input
            type="text"
            placeholder="Enter diagnosis"
            style={styles.formInput}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Symptoms</label>
          <input
            type="text"
            placeholder="Enter symptoms"
            style={styles.formInput}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Medications</label>
          <textarea
            placeholder="Enter medications and dosage"
            style={styles.formTextarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Instructions</label>
          <textarea
            placeholder="Enter special instructions"
            style={styles.formTextarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Follow-up Date</label>
          <input type="date" style={styles.formInput} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Notes</label>
          <textarea
            placeholder="Additional notes"
            style={styles.formTextarea}
          />
        </div>
      </div>
      <div style={styles.prescriptionButtons}>
        <button style={styles.submitButton}>Save Prescription</button>
        <button
          style={styles.cancelButton}
          onClick={() => setShowPrescriptionForm(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div style={styles.profileContent}>
            <div style={styles.profileHeader}>
              <div style={styles.profileImageContainer}>
                {doctorData?.image ? (
                  <img
                    src={doctorData.image}
                    alt="Doctor"
                    style={styles.profileImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : (
                  <div
                    style={{
                      ...styles.profileImage,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f3f4f6",
                    }}
                  >
                    <UserCircle size={80} color="#9ca3af" />
                  </div>
                )}
                <div style={styles.onlineStatus}></div>
              </div>
              <div style={styles.profileInfo}>
                <div style={styles.nameSection}>
                  <h2 style={styles.doctorName}>Dr. {doctorData?.degrees}</h2>
                  <span style={styles.verifiedBadge}>✓ Verified</span>
                </div>
                <p style={styles.specialization}>
                  {doctorData?.specialization}
                </p>
                <div style={styles.statsContainer}>
                  <div style={styles.statItem}>
                    <span style={styles.statValue}>
                      {doctorData?.experience}
                    </span>
                    <span style={styles.statLabel}>Years Experience</span>
                  </div>
                  <div style={styles.statDivider}></div>
                  <div style={styles.statItem}>
                    <span style={styles.statValue}>1.2k+</span>
                    <span style={styles.statLabel}>Patients</span>
                  </div>
                  <div style={styles.statDivider}></div>
                  <div style={styles.statItem}>
                    <span style={styles.statValue}>4.9</span>
                    <span style={styles.statLabel}>Rating</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={styles.contentGrid}>
              <div style={styles.bioSection}>
                <h3 style={styles.sectionTitle}>About Me</h3>
                <p style={styles.bioText}>{doctorData?.bio}</p>
                <div style={styles.expertiseContainer}>
                  <h4 style={styles.subSectionTitle}>Areas of Expertise</h4>
                  <div style={styles.expertiseTags}>
                    <span style={styles.expertiseTag}>General Medicine</span>
                    <span style={styles.expertiseTag}>Cardiology</span>
                    <span style={styles.expertiseTag}>Pediatrics</span>
                  </div>
                </div>
              </div>
              <div style={styles.certificatesSection}>
                <h3 style={styles.sectionTitle}>Certifications & Licenses</h3>
                <div style={styles.certificateGrid}>
                  {doctorData?.certificates?.map((cert, index) => (
                    <div key={index} style={styles.certificateCard}>
                      <div style={styles.certificateIcon}>📜</div>
                      <div style={styles.certificateInfo}>
                        <h4 style={styles.certificateName}>{cert.name}</h4>
                        <p style={styles.certificateDate}>Issued: 2024</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "patients":
        return (
          <div style={styles.patientsContent}>
            <div style={styles.patientsHeader}>
              <div style={styles.searchBarContainer}>
                <div style={styles.searchBar}>
                  <Search style={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search patients by name, condition, or ID..."
                    style={styles.searchInput}
                  />
                </div>
                <select style={styles.filterSelect}>
                  <option value="">All Patients</option>
                  <option value="critical">Critical</option>
                  <option value="stable">Stable</option>
                  <option value="regular">Regular</option>
                </select>
              </div>
              <button style={styles.addPatientButton}>
                <PlusCircle style={styles.buttonIcon} />
                Add New Patient
              </button>
            </div>
            <div style={styles.patientsList}>
              <div style={styles.patientsTable}>
                <div style={styles.tableHeader}>
                  <div style={styles.tableHeaderCell}>Patient Name</div>
                  <div style={styles.tableHeaderCell}>Age</div>
                  <div style={styles.tableHeaderCell}>Condition</div>
                  <div style={styles.tableHeaderCell}>Last Visit</div>
                  <div style={styles.tableHeaderCell}>Status</div>
                  <div style={styles.tableHeaderCell}>Actions</div>
                </div>
                {patients.map((patient) => (
                  <div key={patient.id} style={styles.tableRow}>
                    <div style={styles.tableCell}>{patient.name}</div>
                    <div style={styles.tableCell}>{patient.age}</div>
                    <div style={styles.tableCell}>{patient.condition}</div>
                    <div style={styles.tableCell}>{patient.lastVisit}</div>
                    <div style={styles.tableCell}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          backgroundColor: getStatusColor(patient.status),
                        }}
                      >
                        {patient.status}
                      </span>
                    </div>
                    <div style={styles.tableCell}>
                      <div style={styles.actionButtons}>
                        <button
                          style={styles.actionButton}
                          onClick={() => {
                            setSelectedPatient(patient);
                            setShowPrescriptionForm(true);
                          }}
                        >
                          <FileText size={16} />
                        </button>
                        <button style={styles.actionButton}>
                          <Users size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "prescriptions":
        return (
          <div style={styles.prescriptionsContent}>
            <div style={styles.prescriptionStats}>
              <div style={styles.statCard}>
                <div style={styles.statCardIcon}>📊</div>
                <div style={styles.statCardContent}>
                  <h3 style={styles.statCardTitle}>Total Prescriptions</h3>
                  <p style={styles.statCardValue}>156</p>
                  <span style={styles.statCardTrend}>↑ 12% this month</span>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statCardIcon}>📅</div>
                <div style={styles.statCardContent}>
                  <h3 style={styles.statCardTitle}>This Month</h3>
                  <p style={styles.statCardValue}>24</p>
                  <span style={styles.statCardTrend}>↑ 8% vs last month</span>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statCardIcon}>📋</div>
                <div style={styles.statCardContent}>
                  <h3 style={styles.statCardTitle}>Today</h3>
                  <p style={styles.statCardValue}>3</p>
                  <span style={styles.statCardTrend}>Active prescriptions</span>
                </div>
              </div>
            </div>
            <div style={styles.prescriptionFilters}>
              <div style={styles.filterGroup}>
                <select style={styles.filterSelect}>
                  <option value="all">All Prescriptions</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
                <select style={styles.filterSelect}>
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
              <button style={styles.newPrescriptionButton}>
                <PlusCircle style={styles.buttonIcon} />
                New Prescription
              </button>
            </div>
            <div style={styles.recentPrescriptions}>
              <h3 style={styles.sectionTitle}>Recent Prescriptions</h3>
              <div style={styles.prescriptionList}>
                {[1, 2, 3].map((_, index) => (
                  <div key={index} style={styles.prescriptionCard}>
                    <div style={styles.prescriptionCardHeader}>
                      <div style={styles.prescriptionPatient}>
                        <h4>John Doe</h4>
                        <span>Prescribed on March 15, 2024</span>
                      </div>
                      <span
                        style={{
                          ...styles.statusBadge,
                          backgroundColor: "#4CAF50",
                        }}
                      >
                        Active
                      </span>
                    </div>
                    <div style={styles.prescriptionDetails}>
                      <div style={styles.prescriptionDetail}>
                        <span style={styles.detailLabel}>Diagnosis:</span>
                        <span>Hypertension</span>
                      </div>
                      <div style={styles.prescriptionDetail}>
                        <span style={styles.detailLabel}>Medications:</span>
                        <span>Amlodipine 5mg</span>
                      </div>
                      <div style={styles.prescriptionDetail}>
                        <span style={styles.detailLabel}>Next Follow-up:</span>
                        <span>March 29, 2024</span>
                      </div>
                    </div>
                    <div style={styles.prescriptionCardFooter}>
                      <button style={styles.viewDetailsButton}>
                        View Details
                      </button>
                      <button style={styles.printButton}>Print</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <User style={styles.sidebarIcon} />
          <h2 style={styles.sidebarTitle}>MediDash</h2>
        </div>
        <nav style={styles.navigation}>
          <button
            style={{
              ...styles.navButton,
              backgroundColor:
                activeTab === "profile" ? "#4A90E2" : "transparent",
              color: activeTab === "profile" ? "#fff" : "#333",
            }}
            onClick={() => setActiveTab("profile")}
          >
            <User style={styles.navIcon} />
            Profile
          </button>
          <button
            style={{
              ...styles.navButton,
              backgroundColor:
                activeTab === "patients" ? "#4A90E2" : "transparent",
              color: activeTab === "patients" ? "#fff" : "#333",
            }}
            onClick={() => setActiveTab("patients")}
          >
            <Users style={styles.navIcon} />
            Patients
          </button>
          <button
            style={{
              ...styles.navButton,
              backgroundColor:
                activeTab === "prescriptions" ? "#4A90E2" : "transparent",
              color: activeTab === "prescriptions" ? "#fff" : "#333",
            }}
            onClick={() => setActiveTab("prescriptions")}
          >
            <FileText style={styles.navIcon} />
            Prescriptions
          </button>
        </nav>
        <div style={styles.sidebarFooter}>
          <div style={styles.userInfo}>
            {doctorData?.image ? (
              <img
                src={doctorData.image}
                alt="Doctor"
                style={styles.userAvatar}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : (
              <div
                style={{
                  ...styles.userAvatar,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f3f4f6",
                }}
              >
                <UserCircle size={24} color="#9ca3af" />
              </div>
            )}
            <div style={styles.userDetails}>
              <p style={styles.userName}>Dr. {doctorData?.degrees}</p>
              <p style={styles.userRole}>{doctorData?.specialization}</p>
            </div>
          </div>
          <button
            style={styles.logoutButton}
            onClick={() => navigate("/register")}
          >
            <LogOut style={styles.navIcon} />
            Logout
          </button>
        </div>
      </div>
      <div style={styles.mainContent}>
        {showPrescriptionForm ? <PrescriptionForm /> : renderContent()}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f0f4f8",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  sidebar: {
    width: "280px",
    backgroundColor: "#ffffff",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
    position: "relative",
    zIndex: 1000,
  },
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "40px",
  },
  sidebarIcon: {
    fontSize: "28px",
    color: "#4A90E2",
    marginRight: "12px",
  },
  sidebarTitle: {
    fontSize: "24px",
    color: "#1a1a1a",
    fontWeight: "600",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  navigation: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },
  navButton: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "16px",
    fontWeight: "500",
  },
  navIcon: {
    marginRight: "12px",
    fontSize: "20px",
  },
  sidebarFooter: {
    marginTop: "auto",
    borderTop: "1px solid #eee",
    paddingTop: "20px",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
    padding: "12px",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
  },
  userAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "12px",
    objectFit: "cover",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  userRole: {
    margin: 0,
    fontSize: "12px",
    color: "#666",
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    backgroundColor: "#fee2e2",
    color: "#ef4444",
    fontWeight: "500",
    transition: "all 0.3s ease",
  },
  mainContent: {
    flex: 1,
    padding: "32px",
    overflowY: "auto",
  },
  profileContent: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  profileHeader: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "40px",
    padding: "24px",
    backgroundColor: "#f8fafc",
    borderRadius: "16px",
  },
  profileImageContainer: {
    position: "relative",
    marginRight: "32px",
  },
  profileImage: {
    width: "120px",
    height: "120px",
    borderRadius: "16px",
    objectFit: "cover",
    border: "4px solid #fff",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  onlineStatus: {
    position: "absolute",
    bottom: "4px",
    right: "4px",
    width: "12px",
    height: "12px",
    backgroundColor: "#4CAF50",
    borderRadius: "50%",
    border: "2px solid #fff",
  },
  profileInfo: {
    flex: 1,
  },
  nameSection: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  },
  doctorName: {
    fontSize: "28px",
    color: "#1a1a1a",
    fontWeight: "600",
    marginRight: "12px",
    marginBottom: 0,
  },
  verifiedBadge: {
    backgroundColor: "#4A90E2",
    color: "#fff",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "500",
  },
  specialization: {
    fontSize: "18px",
    color: "#666",
    marginBottom: "24px",
  },
  statsContainer: {
    display: "flex",
    alignItems: "center",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "14px",
    color: "#666",
  },
  statDivider: {
    width: "1px",
    height: "40px",
    backgroundColor: "#e5e7eb",
    margin: "0 32px",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "32px",
    marginTop: "32px",
  },
  bioSection: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "20px",
    color: "#1a1a1a",
    fontWeight: "600",
    marginBottom: "16px",
  },
  bioText: {
    fontSize: "16px",
    color: "#4a5568",
    lineHeight: 1.6,
    marginBottom: "24px",
  },
  expertiseContainer: {
    marginTop: "24px",
  },
  subSectionTitle: {
    fontSize: "16px",
    color: "#1a1a1a",
    fontWeight: "500",
    marginBottom: "12px",
  },
  expertiseTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  expertiseTag: {
    backgroundColor: "#e5e7eb",
    color: "#1a1a1a",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "500",
  },
  certificatesSection: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  certificateGrid: {
    display: "grid",
    gap: "16px",
  },
  certificateCard: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    transition: "transform 0.2s ease",
  },
  certificateIcon: {
    fontSize: "24px",
    marginRight: "16px",
  },
  certificateInfo: {
    flex: 1,
  },
  certificateName: {
    fontSize: "16px",
    color: "#1a1a1a",
    fontWeight: "500",
    margin: 0,
  },
  certificateDate: {
    fontSize: "14px",
    color: "#666",
    margin: "4px 0 0 0",
  },
  patientsContent: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  patientsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },
  searchBarContainer: {
    display: "flex",
    gap: "16px",
    flex: 1,
    marginRight: "24px",
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },
  searchIcon: {
    color: "#9ca3af",
    marginRight: "12px",
    fontSize: "18px",
  },
  searchInput: {
    border: "none",
    background: "none",
    flex: 1,
    fontSize: "16px",
    color: "#1a1a1a",
    outline: "none",
  },
  filterSelect: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
    fontSize: "16px",
    color: "#1a1a1a",
    cursor: "pointer",
    outline: "none",
  },
  addPatientButton: {
    display: "flex",
    alignItems: "center",
    padding: "12px 24px",
    backgroundColor: "#4A90E2",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonIcon: {
    marginRight: "8px",
    fontSize: "18px",
  },
  patientsTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1.5fr 1.5fr 1fr 1fr",
    padding: "16px",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    marginBottom: "8px",
  },
  tableHeaderCell: {
    color: "#64748b",
    fontSize: "14px",
    fontWeight: "500",
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1.5fr 1.5fr 1fr 1fr",
    padding: "16px",
    borderBottom: "1px solid #e5e7eb",
    alignItems: "center",
  },
  tableCell: {
    fontSize: "15px",
    color: "#1a1a1a",
  },
  statusBadge: {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#ffffff",
    display: "inline-block",
  },
  actionButtons: {
    display: "flex",
    gap: "8px",
  },
  actionButton: {
    padding: "8px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#f1f5f9",
    color: "#64748b",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  prescriptionsContent: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  prescriptionStats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    marginBottom: "32px",
  },
  statCard: {
    display: "flex",
    alignItems: "center",
    padding: "24px",
    backgroundColor: "#f8fafc",
    borderRadius: "16px",
    transition: "transform 0.2s ease",
  },
  statCardIcon: {
    fontSize: "32px",
    marginRight: "16px",
  },
  statCardContent: {
    flex: 1,
  },
  statCardTitle: {
    fontSize: "16px",
    color: "#64748b",
    marginBottom: "8px",
  },
  statCardValue: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "4px",
  },
  statCardTrend: {
    fontSize: "14px",
    color: "#4CAF50",
  },
  prescriptionFilters: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },
  filterGroup: {
    display: "flex",
    gap: "16px",
  },
  newPrescriptionButton: {
    display: "flex",
    alignItems: "center",
    padding: "12px 24px",
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  prescriptionList: {
    display: "grid",
    gap: "16px",
  },
  prescriptionCard: {
    backgroundColor: "#f8fafc",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  prescriptionCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "16px",
  },
  prescriptionPatient: {
    "& h4": {
      fontSize: "18px",
      color: "#1a1a1a",
      fontWeight: "500",
      marginBottom: "4px",
    },
    "& span": {
      fontSize: "14px",
      color: "#64748b",
    },
  },
  prescriptionDetails: {
    display: "grid",
    gap: "12px",
    marginBottom: "24px",
  },
  prescriptionDetail: {
    display: "flex",
    fontSize: "15px",
  },
  detailLabel: {
    color: "#64748b",
    width: "100px",
    flexShrink: 0,
  },
  prescriptionCardFooter: {
    display: "flex",
    gap: "12px",
  },
  viewDetailsButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#4A90E2",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
  },
  printButton: {
    padding: "10px 20px",
    backgroundColor: "#f1f5f9",
    color: "#64748b",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
  },
  prescriptionForm: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  prescriptionFormHeader: {
    marginBottom: "32px",
  },
  prescriptionHeader: {
    fontSize: "24px",
    color: "#1a1a1a",
    fontWeight: "600",
    marginBottom: "16px",
  },
  patientSummary: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
  },
  patientSummaryInfo: {
    "& h4": {
      fontSize: "18px",
      color: "#1a1a1a",
      marginBottom: "4px",
    },
    "& span": {
      fontSize: "14px",
      color: "#64748b",
    },
  },
  prescriptionFormGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
    marginBottom: "32px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  formLabel: {
    fontSize: "15px",
    color: "#64748b",
    fontWeight: "500",
  },
  formInput: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  formTextarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "15px",
    minHeight: "120px",
    resize: "vertical",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  prescriptionButtons: {
    display: "flex",
    gap: "16px",
    justifyContent: "flex-end",
  },
  submitButton: {
    padding: "12px 32px",
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  cancelButton: {
    padding: "12px 32px",
    backgroundColor: "#fee2e2",
    color: "#ef4444",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default DoctorMainProfile;
