import React, { useState, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle2, Download, Activity, Coins, Sparkles, RefreshCw } from 'lucide-react';

function CTScanUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);
  const [selectedDisorder, setSelectedDisorder] = useState('');
  const [hasToken, setHasToken] = useState(true);
  const [predictionResult, setPredictionResult] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [report, setReport] = useState('');
  const fileInputRef = useRef(null);

  const disorders = [
    { id: "Alzheimer's", name: "Alzheimer's Disease", icon: '🧠' },
    { id: 'Brain Tumor', name: "Brain Tumor", icon: '🎯' },
  ];

  const handleFileUpload = async (file) => {
    if (!selectedDisorder) {
      alert('Please select a disorder type first');
      return;
    }

    setSelectedFile(file);
    setIsAnalyzing(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('model_type', selectedDisorder);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { result, confidence, report } = response.data;
      setPredictionResult(result);
      setConfidence(confidence);
      setReport(formatReport(report));
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    } catch (error) {
      console.error('Error during analysis:', error);
      setIsAnalyzing(false);
      alert('Failed to analyze the CT scan.');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleRefresh = () => {
    setSelectedFile(null);
    setIsAnalyzing(false);
    setAnalysisComplete(false);
    setSelectedDisorder('');
    setPredictionResult(null);
    setConfidence(null);
    setReport('');
    setHasToken(true);
  };

  const formatReport = (reportText) => {
    return reportText
      .replace(/^##\s(.*$)/gm, '<h2><strong>$1</strong></h2>')
      .replace(/^\*\*(.*?)\*\*/gm, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
  };

  const containerStyle = {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const reportStyle = {
    backgroundColor: '#f9fafb',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    maxHeight: '300px',
    overflowY: 'auto',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.5'
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Alzheimer's Detect</h1>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h3>Select Disorder Type</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {disorders.map((disorder) => (
            <button
              key={disorder.id}
              onClick={() => setSelectedDisorder(disorder.id)}
              style={{
                padding: '10px 20px',
                border: selectedDisorder === disorder.id ? '2px solid #3b82f6' : '1px solid #ccc',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: selectedDisorder === disorder.id ? '#e0f2fe' : 'white'
              }}
            >
              {disorder.icon} {disorder.name}
            </button>
          ))}
        </div>
      </div>

      {selectedDisorder && (
        <div
          style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', borderRadius: '8px' }}
          onClick={() => fileInputRef.current.click()}
        >
          <Upload size={40} />
          <p>Upload CT Scan</p>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileSelect}
            accept="image/*,.dcm"
          />
          {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        </div>
      )}

      <AnimatePresence>
        {isAnalyzing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Activity size={40} />
            <p>Analyzing...</p>
          </motion.div>
        )}

        {analysisComplete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3>Analysis Complete</h3>
            <p><strong>Diagnosis:</strong> {predictionResult}</p>
            <p><strong>Confidence:</strong> {confidence?.toFixed(2)}%</p>
            <div style={{ margin: '20px 0' }}>
              <h4>Medical Report:</h4>
              <div style={reportStyle} dangerouslySetInnerHTML={{ __html: report }} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(report)}`} download={`medical_report_${predictionResult}.txt`}>
                <button style={{ ...buttonStyle, backgroundColor: '#059669', color: 'white' }}>
                  <Download size={20} /> Download Report
                </button>
              </a>
              <button onClick={handleRefresh} style={{ ...buttonStyle, backgroundColor: '#ef4444', color: 'white' }}>
                <RefreshCw size={20} /> Clear/Refresh
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CTScanUpload;