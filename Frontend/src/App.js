import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CTScanUpload from "./components/CTScanUpload";
import BlogPostCreation from "./components/BlogPostCreation";
import BlogPostList from "./components/BlogPostList";
import DonationPage from "./components/DonationPage";
import EducationalContent from "./components/EducationalContent";
import TokenWallet from "./components/TokenWallet";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import PatientProfile from "./components/PatientProfile";
import DoctorProfile from "./components/DoctorProfile";
import DoctorMainProfile from "./components/DoctorMainProfile";
import PatientDashboard from "./components/PatientDashboard";
import AppointmentDetailsModal from "./components/AppointmentDetailsModal";
import EmergencyPortal from './components/EmergencyPortal';


const App = () => {
  // const [isDataLoaded, setIsDataLoaded] = useState(false);

  // // Fetch data from the backend when the component mounts
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/getData")
  //     .then(() => {
  //       setIsDataLoaded(true); // Mark data as loaded
  //     })
  //     .catch((error) => {
  //       console.error("There was an error!", error);
  //       setIsDataLoaded(false);
  //     });
  // }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ct-scan-upload" element={<CTScanUpload />} />
        <Route path="/blog/create" element={<BlogPostCreation />} />
        <Route path="/blog" element={<BlogPostList />} />
        <Route path="/donate" element={<DonationPage />} />
        <Route path="/educational-content" element={<EducationalContent />} />
        <Route path="/token-wallet" element={<TokenWallet />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient-profile" element={<PatientProfile />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
        <Route path="/doctor-main-profile" element={<DoctorMainProfile />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/appointment-details-modal" element={<AppointmentDetailsModal />} />
        <Route
          path="/emergency"
          element={
            
              <EmergencyPortal />
          
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
