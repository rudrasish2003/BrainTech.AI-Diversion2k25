// src/components/Messaging.js
import React, { useState } from 'react';


const Messaging = () => {
    const [message, setMessage] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        // Handle message sending logic
    };

    return (
        <form onSubmit={handleSend} className="messaging">
            <h2>Send a Message</h2>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." required />
            <button type="submit">Send</button>
        </form>
    );
};

export default Messaging;