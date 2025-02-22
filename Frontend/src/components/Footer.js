import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Brain
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribeStatus('Subscribed successfully!');
    setEmail('');
    setTimeout(() => setSubscribeStatus(''), 3000);
  };

  const footerStyle = {
    background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.97), rgba(255, 237, 213, 0.97))',
    backdropFilter: 'blur(12px)',
    borderTop: '1px solid rgba(234, 179, 8, 0.1)',
    padding: '4rem 0 2rem',
    color: '#374151'
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem'
  };

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem'
  };

  const logoTextStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #EA580C, #F97316)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const linkStyle = {
    color: '#4B5563',
    textDecoration: 'none',
    transition: 'all 300ms ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    ':hover': {
      color: '#EA580C',
      transform: 'translateX(5px)'
    }
  };

  const socialContainerStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  };

  const socialIconStyle = {
    padding: '0.5rem',
    borderRadius: '50%',
    backgroundColor: 'rgba(234, 88, 12, 0.1)',
    color: '#EA580C',
    cursor: 'pointer',
    transition: 'all 300ms ease',
    ':hover': {
      backgroundColor: '#EA580C',
      color: 'white',
      transform: 'translateY(-3px)'
    }
  };

  const inputContainerStyle = {
    position: 'relative',
    maxWidth: '400px'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    paddingRight: '3rem',
    borderRadius: '0.5rem',
    border: '1px solid rgba(234, 88, 12, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    outline: 'none',
    transition: 'all 300ms ease',
    ':focus': {
      borderColor: '#EA580C',
      boxShadow: '0 0 0 2px rgba(234, 88, 12, 0.2)'
    }
  };

  const submitButtonStyle = {
    position: 'absolute',
    right: '0.5rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#EA580C',
    cursor: 'pointer',
    padding: '0.25rem',
    transition: 'transform 300ms ease',
    ':hover': {
      transform: 'translateY(-50%) scale(1.1)'
    }
  };

  const copyrightStyle = {
    textAlign: 'center',
    borderTop: '1px solid rgba(234, 88, 12, 0.1)',
    paddingTop: '2rem',
    color: '#6B7280'
  };

  const statusMessageStyle = {
    color: '#EA580C',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
    transition: 'opacity 300ms ease',
    opacity: subscribeStatus ? 1 : 0
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={gridStyle}>
          <div style={sectionStyle}>
            <div style={logoStyle}>
              <Brain size={32} color="#EA580C" />
              <span style={logoTextStyle}>Alzheimer's Detect</span>
            </div>
            <p>Empowering early detection and support for Alzheimer's through advanced AI technology.</p>
            <div style={socialContainerStyle}>
              <a href="#" style={socialIconStyle}><Facebook size={20} /></a>
              <a href="#" style={socialIconStyle}><Twitter size={20} /></a>
              <a href="#" style={socialIconStyle}><Instagram size={20} /></a>
              <a href="#" style={socialIconStyle}><Youtube size={20} /></a>
            </div>
          </div>

          <div style={sectionStyle}>
            <h3 style={{ color: '#EA580C', fontWeight: 'bold' }}>Quick Links</h3>
            <Link to="/about" style={linkStyle}>About Us</Link>
            <Link to="/services" style={linkStyle}>Our Services</Link>
            <Link to="/research" style={linkStyle}>Research</Link>
            <Link to="/blog" style={linkStyle}>Blog</Link>
            <Link to="/contact" style={linkStyle}>Contact</Link>
          </div>

          <div style={sectionStyle}>
            <h3 style={{ color: '#EA580C', fontWeight: 'bold' }}>Contact Info</h3>
            <a href="tel:+918274949362" style={linkStyle}>
              <Phone size={16} />
              <span>+91 8274949362</span>
            </a>
            <a href="swarupmtra54@gmail.com" style={linkStyle}>
              <Mail size={16} />
              <span>swarupmtra54@gmail.com</span>
            </a>
            <a href="#" style={linkStyle}>
              <MapPin size={16} />
              <span>Madhyamgram</span>
            </a>
          </div>

          <div style={sectionStyle}>
            <h3 style={{ color: '#EA580C', fontWeight: 'bold' }}>Newsletter</h3>
            <p>Subscribe to our newsletter for the latest updates and insights.</p>
            <form onSubmit={handleSubscribe}>
              <div style={inputContainerStyle}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                />
                <button type="submit" style={submitButtonStyle}>
                  <ArrowRight size={20} />
                </button>
              </div>
              <div style={statusMessageStyle}>{subscribeStatus}</div>
            </form>
          </div>
        </div>

        <div style={copyrightStyle}>
          <p>© {new Date().getFullYear()} Alzheimer's Detection Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
