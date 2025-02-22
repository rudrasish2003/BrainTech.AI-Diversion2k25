import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  Stethoscope,
  X,
  FileText,
} from 'lucide-react';

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    padding: '2rem',
    width: '80vw',
    overflow: 'scroll',
    height:'80vh',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    position: 'absolute',
    top: '1rem',
    right: '1rem',
  },
  title: {
    marginBottom: '1rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color:'#2563EB'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  input: {
    padding: '0.5rem',
    borderRadius: '0.25rem',
    border: '1px solid #ccc',
    width: '80%',
  },
  select: {
    padding: '0.5rem',
    borderRadius: '0.25rem',
    border: '1px solid #ccc',
    width: '80%',
  },
  textarea: {
    padding: '0.5rem',
    borderRadius: '0.25rem',
    border: '1px solid #ccc',
    width: '100%',
    minHeight: '40px',
  },
  timeSlots: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  timeSlot: {
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    border: '1px solid #ccc',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  selectedTimeSlot: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: '1px solid #2563eb',
  },
   // ... (other styles remain unchanged)
  
   submitButton: {
    backgroundColor: '#007BFF', // Primary color
    color: 'white',
    padding: '0.75rem 1.5rem', // Increased padding for a more substantial look
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    fontSize: '1rem', // Slightly larger font size
    fontWeight: '600', // Bold text
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
  },
  submitButtonHover: {
    backgroundColor: '#0056b3', // Darker shade for hover effect
    transform: 'scale(1.05)', // Slightly enlarge on hover
  },
  };

const AppointmentDetailsModal = ({ onAppointmentBooked, onClose }) => {
  const [formData, setFormData] = useState({
    specialization: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    symptoms: '',
    medicalHistory: '',
    medications: '',
    allergies: '',
  });

  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [errors, setErrors] = useState({});

  const specializations = [
    'General Medicine',
    'Cardiology',
    'Dermatology',
    'Orthopedics',
    'Pediatrics',
    'Neurology',
    'Gynecology',
    'Ophthalmology',
    'ENT',
    'Dentistry'
  ];

  const minDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() +4 );
    return date.toISOString().split('T')[0];
  }, []);

  const timeSlots = useMemo(() => [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ], []);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.specialization) newErrors.specialization = 'Specialization is required';
    if (!formData.date) newErrors.date = 'Appointment date is required';
    if (!formData.time) newErrors.time = 'Please select a time slot';
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Valid phone number is required';
    if (!formData.symptoms) newErrors.symptoms = 'Symptoms are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const appointmentDetails = {
        ...formData,
        id: Date.now(),
        status: 'Scheduled',
        doctorName: 'Dr. Sarah Johnson',
      };
      onAppointmentBooked(appointmentDetails);
      onClose(); // Close the modal after booking
    }
  };

  const handleTimeSlotSelect = (time) => {
    setSelectedTimeSlot(time);
    setFormData({ ...formData, time });
    setErrors({ ...errors, time: undefined });
  };

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>
          <X size={24} />
        </button>

        <h2 style={styles.title}>Schedule Your Appointment</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <Stethoscope size={20} color='#2563EB'/>
              Medical Specialty
            </label>
            <select
              value={formData.specialization}
              onChange={(e) => {
                setFormData({ ...formData, specialization: e.target.value });
                setErrors({ ...errors, specialization: undefined });
              }}
              style={styles.select}
              required
            >
              <option value="">Select Specialty</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
            {errors.specialization && <span style={{ color: 'red' }}>{errors.specialization}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <Calendar size={20} color='#2563EB' />
              Appointment Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => {
                setFormData({ ...formData, date: e.target.value });
                setErrors({ ...errors, date: undefined });
              }}
              style={styles.input}
              min={minDate}
              required
            />
            {errors.date && <span style={{ color: 'red' }}>{errors.date}</span>}
          </div>

          <div style={{ ...styles.formGroup, ...styles.fullWidth }}>
            <label style={styles.label}>
              <Clock size={20} color='#2563EB'/>
              Available Time Slots
            </label>
            <div style={styles.timeSlots}>
              {timeSlots.map((time) => (
                <div
                  key={time}
                  onClick={() => handleTimeSlotSelect(time)}
                  style={{
                    ...styles.timeSlot,
                    ...(selectedTimeSlot === time ? styles.selectedTimeSlot : {}),
                  }}
                >
                  {time}
                </div>
              ))}
            </div>
            {errors.time && <span style={{ color: 'red' }}>{errors.time}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <User  size={20} color='#2563EB'/>
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                setErrors({ ...errors, name: undefined });
              }}
              style={styles.input}
              required
            />
            {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <Phone size={20} color='#2563EB' />
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                setErrors({ ...errors, phone: undefined });
              }}
              style={styles.input}
              required
            />
            {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>
            }</div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <MessageSquare size={20} color='#2563EB' />
              Symptoms
            </label>
            <textarea
              value={formData.symptoms}
              onChange={(e) => {
                setFormData({ ...formData, symptoms: e.target.value });
                setErrors({ ...errors, symptoms: undefined });
              }}
              style={styles.textarea}
              required
            />
            {errors.symptoms && <span style={{ color: 'red' }}>{errors.symptoms}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FileText size={20} color='#2563EB'/>
              Medical History (Optional)
            </label>
            <textarea
              value={formData.medicalHistory}
              onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
              style={styles.textarea}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FileText size={20} color='#2563EB'/>
              Current Medications (Optional)
            </label>
            <textarea
              value={formData.medications}
              onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
              style={styles.textarea}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FileText size={20} color='#2563EB'/>
              Allergies (Optional)
            </label>
            <textarea
              value={formData.allergies}
              onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
              style={styles.textarea}
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;