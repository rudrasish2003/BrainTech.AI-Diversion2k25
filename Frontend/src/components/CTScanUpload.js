import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Brain, 
  Clock2 as Clock24, 
  FileText, 
  Calendar, 
  Shield, 
  Download, 
  Activity, 
  CheckCircle2,
  Coins,
  Sparkles
} from 'lucide-react';

function CTScanUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);
  const [selectedDisorder, setSelectedDisorder] = useState('');
  const [hasToken, setHasToken] = useState(true);
  const fileInputRef = useRef(null);

  const disorders = [
    { id: 'alzheimers', name: "Alzheimer's Disease", icon: '🧠' },
    { id: 'parkinsons', name: "Parkinson's Disease", icon: '🤝' },
    { id: 'ms', name: "Multiple Sclerosis", icon: '🔬' },
    { id: 'epilepsy', name: "Epilepsy", icon: '⚡' },
    { id: 'brain-tumor', name: "Brain Tumor", icon: '🎯' },
    { id: 'stroke', name: "Stroke", icon: '🩺' },
    { id: 'adhd', name: "ADHD", icon: '🎭' },
    { id: 'anxiety', name: "Anxiety Disorders", icon: '😰' },
    { id: 'depression', name: "Depression", icon: '💭' },
    { id: 'schizophrenia', name: "Schizophrenia", icon: '🌀' }
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && isValidFile(file)) {
      handleFileUpload(file);
    } else {
      alert('Please upload a valid image or DICOM file.');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && isValidFile(file)) {
      handleFileUpload(file);
    } else {
      alert('Please upload a valid image or DICOM file.');
    }
  };

  const isValidFile = (file) => {
    return file.type.includes('image') || 
           file.name.toLowerCase().endsWith('.dcm') || 
           file.type.includes('dicom');
  };

  const handleFileUpload = (file) => {
    if (!selectedDisorder) {
      alert('Please select a disorder type first');
      return;
    }
    
    setSelectedFile(file);
    console.log('Selected file:', file); // Log the selected file
    if (!hasToken) {
      setShowSubscriptionPrompt(true);
    } else {
      simulateAnalysis();
      setHasToken(false); // Use up the free token
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  // Styles
  const containerStyle = {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const heroStyle = {
    backgroundImage: 'url("https://sjra.com/wp-content/uploads/2023/10/Woman-Lying-Down-During-CT-Scan.webp")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '80px 20px',
    borderRadius: '20px',
    color: 'white',
    textAlign: 'center',
    marginBottom: '40px',
    position: 'relative'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '20px'
  };

  const freeScanSectionStyle = {
    backgroundColor: '#f0f9ff',
    borderRadius: '20px',
    padding: '40px',
    marginBottom: '40px',
    position: 'relative',
    overflow: 'hidden'
  };

  const uploadZoneStyle = {
    border: isDragging ? '3px dashed #3b82f6' : '3px dashed #e5e7eb',
    borderRadius: '15px',
    padding: '40px',
    textAlign: 'center',
    backgroundColor: isDragging ? 'rgba(59, 130, 246, 0.1)' : 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '40px'
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '1.25rem',
    borderRadius: '1rem',
    fontWeight: '600',
    fontSize: '1.125rem',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 12px 24px -4px rgba(79, 70, 229, 0.3)'
  };

  const subscriptionCardStyle = {
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    borderRadius: '20px',
    padding: '40px',
    color: 'white',
    boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
    marginBottom: '30px'
  };

  const tokenBadgeStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: hasToken ? 'rgba(5, 150, 105, 0.1)' : 'rgba(239, 68, 68, 0.1)',
    color: hasToken ? '#059669' : '#ef4444',
    padding: '8px 16px',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '20px',
    width: 'fit-content',
    margin: '0 auto 20px'
  };

  return (
    <div style={containerStyle}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={heroStyle}
      >
        <div style={overlayStyle}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '56px', marginBottom: '20px', fontWeight: 'bold' }}
          >
            Early Detection Matters
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ fontSize: '24px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}
          >
            Get your free CT scan analysis today using our advanced AI technology
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        style={freeScanSectionStyle}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={tokenBadgeStyle}
        >
          <Coins size={18} />
          {hasToken ? (
            <span>You have 1 free analysis token available!</span>
          ) : (
            <span>No tokens available - Subscribe for unlimited scans</span>
          )}
        </motion.div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#1f2937', fontWeight: 'bold', textAlign: 'center' }}>
            Select Disorder Type
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
            {disorders.map((disorder) => (
              <motion.button
                key={disorder.id}
                onClick={() => setSelectedDisorder(disorder.id)}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: '2px solid',
                  borderColor: selectedDisorder === disorder.id ? '#3b82f6' : '#e5e7eb',
                  backgroundColor: selectedDisorder === disorder.id ? 'rgba(59, 130, 246, 0.1)' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span style={{ fontSize: '20px' }}>{disorder.icon}</span>
                <span style={{ fontSize: '14px', color: '#1f2937' }}>{disorder.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div
          style={uploadZoneStyle}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => selectedDisorder && fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*,.dcm"
            style={{ display: 'none' }}
          />
          <Upload size={48} style={{ color: '#3b82f6', margin: '0 auto 20px' }} />
          <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#1f2937' }}>
            Upload CT Scan
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>
            {selectedDisorder ? 
              'Drag and drop your CT scan file here, or click to select' :
              'Please select a disorder type first'
            }
          </p>
          {selectedFile && (
            <p style={{ color: '#059669', fontWeight: '500' }}>
              Selected file: {selectedFile.name}
            </p>
          )}
        </div>

        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '30px',
                textAlign: 'center',
                marginBottom: '30px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Activity size={48} style={{ color: '#3b82f6', marginBottom: '20px' }} />
              </motion.div>
              <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#1f2937' }}>
                Analyzing Your Scan
              </h3>
              <p style={{ color: '##6b7280' }}>
                Please wait while our AI processes your CT scan...
              </p>
            </motion.div>
          )}

          {analysisComplete && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '30px',
                marginTop: '20px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <CheckCircle2 size={48} style={{ color: '#059669', marginBottom: '20px' }} />
                <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#1f2937' }}>
                  Analysis Complete
                </h3>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <span style={{ color: '#6b7280' }}>Scan Quality</span>
                  <span style={{ color: '#059669', fontWeight: 'bold' }}>Excellent</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '95%' }}
                    transition={{ duration: 1 }}
                    style={{
                      height: '100%',
                      backgroundColor: '#059669',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </div>

              <motion.button
                style={{
                  ...buttonStyle,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: '#059669'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={20} />
                Download Detailed Report (PDF)
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSubscriptionPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                backdropFilter: 'blur(4px)'
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  padding: '40px',
                  maxWidth: '500px',
                  width: '90%',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <Sparkles size={48} style={{ color: '#3b82f6', marginBottom: '20px' }} />
                <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#1f2937', fontWeight: 'bold' }}>
                  Unlock Unlimited CT Scan Analysis
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '20px' }}>
                  You've used your free token. Subscribe now to analyze unlimited CT scans and access premium features.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <motion.button
                  style={{
                    ...buttonStyle,
                    backgroundColor: '#3b82f6'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSubscriptionPrompt(false)}
                >
                  Subscribe Now
                </motion.button>
                <motion.button
                  style={{
                    ...buttonStyle,
                    backgroundColor: 'transparent',
                    border: '2px solid #3b82f6',
                    color: '#3b82f6'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSubscriptionPrompt(false)}
                >
                  Maybe Later
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </div>
);
}

export default CTScanUpload;