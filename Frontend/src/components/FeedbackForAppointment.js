// src/components/FeedbackForAppointment.js
import React, { useState } from 'react';


const FeedbackForAppointment = () => {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle feedback submission logic
    };

    return (
        <form onSubmit={handleSubmit} className="feedback-form">
            <h2>Feedback for Appointment</h2>
            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Your feedback..." required />
            <button type="submit">Submit Feedback</button>
        </form>
    );
};

export default FeedbackForAppointment;