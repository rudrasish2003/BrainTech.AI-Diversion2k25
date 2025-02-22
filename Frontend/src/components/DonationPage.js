import React, { useState, useEffect } from 'react';
import { Heart, Brain, Users, Trophy, ArrowRight } from 'lucide-react';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #F3F4F6, #FFFFFF)',
  },
  heroSection: {
    position: 'relative',
    height: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 1s ease',
  },
  heroImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.5)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    padding: '0 1rem',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#FAFAFA',  
  },
  heroText: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    maxWidth: '32rem',
    margin: '0 auto',
    color: '#FAFAFA',
  },
  donateButton: {
    display: 'inline-flex',
    alignItems: 'center',
    marginTop:'30px',
    backgroundColor: '#4C8BF5',  // Warm blue for button
    color: 'white',
    fontWeight: 600,
    padding: '0.75rem 2rem',
    borderRadius: '9999px',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
  },
  statsContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '4rem 1rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    textAlign: 'center',
  },
  statIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  statValue: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: '0.5rem',
  },
  statLabel: {
    color: '#4B5563',
  },
  donationSection: {
    maxWidth: '64rem',
    margin: '0 auto',
    padding: '4rem 1rem',
  },
  donationCard: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    padding: '2rem',
  },
  donationTitle: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#4C8BF5',  // Warm blue for title
  },
  amountGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  amountButton: {
    padding: '0.75rem 1.5rem',
    borderRadius: '9999px',
    border: 'none',
    backgroundColor: '#4C8BF5',  // Warm blue for the button
    color: 'white',
    fontWeight: '600',
    fontSize: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  amountButtonHover: {
    backgroundColor: '#3A7BD5', // Darker blue for hover
    transform: 'scale(1.05)', // Slight scaling effect
    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)', // Add a subtle shadow on hover
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #D1D5DB',
    marginBottom: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  submitButton: {
    width: '100%',
    background: 'linear-gradient(to right, #4C8BF5, #3A7BD5)',
    color: 'white',
    fontWeight: 600,
    padding: '1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  testimonialSection: {
    backgroundColor: '#E6F0FF', // Soft light blue background
    padding: '4rem 1rem',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    borderRadius: '1rem',
    marginTop: '3rem',
  },
  testimonialContainer: {
    maxWidth: '1152px',
    margin: '0 auto',
  },
  testimonialTitle: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#4C8BF5',  // Warm blue color for titles
  },
  testimonialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  testimonialCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  testimonialImage: {
    width: '4rem',
    height: '4rem',
    borderRadius: '9999px',
    marginBottom: '1rem',
    objectFit: 'cover',
  },
  testimonialQuote: {
    color: '#4B5563',
    fontStyle: 'italic',
    marginBottom: '1rem',
  },
  testimonialAuthor: {
    fontWeight: 600,
    color: '#1F2937',
  },
  testimonialRole: {
    fontSize: '0.875rem',
    color: '#6B7280',
  },
};

function DonationPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [donationAmount, setDonationAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [comment, setComment] = useState('');
  const [testimonials, setTestimonials] = useState([
    {
      quote: "The support we received has been invaluable to our family's journey.",
      author: "Sarah Mitchell",
      role: "Family Member",
    },
    {
      quote: "Thanks to the research funding, we're making breakthrough discoveries.",
      author: "Dr. James Wilson",
      role: "Research Scientist",
    },
    {
      quote: "The community programs have given us hope and connection.",
      author: "Michael Thompson",
      role: "Care Partner",
    },
  ]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const impactStats = [
    { icon: <Heart style={{ width: 32, height: 32, color: '#4C8BF5' }} />, value: "2,500+", label: "Families Supported" },
    { icon: <Brain style={{ width: 32, height: 32, color: '#4C8BF5' }} />, value: "150+", label: "Research Projects" },
    { icon: <Users style={{ width: 32, height: 32, color: '#4C8BF5' }} />, value: "10,000+", label: "Community Members" },
    { icon: <Trophy style={{ width: 32, height: 32, color: '#4C8BF5' }} />, value: "15+", label: "Years of Service" }
  ];

  const donationTiers = [25, 50, 100, 250, 500, 1000];

  const handleDonation = () => {
    const amountToDonate = customAmount || donationAmount;
    const newTestimonial = { quote: comment, author: 'Anonymous Donor', role: 'Donor' };
    setTestimonials([newTestimonial, ...testimonials]); // Add comment to testimonials
    setCustomAmount(''); // Reset the custom amount input
    setComment(''); // Reset the comment input
  };

  const scrollToDonationSection = () => {
    const element = document.getElementById("donation-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={styles.container}>
      <div style={{
        ...styles.heroSection,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
      }}>
        <img
          src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1500&h=500&q=80"
          alt="Hero"
          style={styles.heroImage}
        />
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Donate to Make an Impact</h1>
          <p style={styles.heroText}>
            Your support can help fund research, community outreach, and more. Every dollar counts toward making a lasting difference.
          </p>
          <button
            style={styles.donateButton}
            onClick={scrollToDonationSection} // Scroll to donation section
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#3A7BD5'; // Darker blue on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#4C8BF5'; // Reset original color
            }}
          >
            Donate Now
            <ArrowRight style={{ marginLeft: '0.75rem' }} />
          </button>
        </div>
      </div>

      <div id="donation-section" style={styles.donationSection}>
        <div style={styles.donationCard}>
          <h2 style={styles.donationTitle}>Choose Your Donation</h2>
          <div style={styles.amountGrid}>
            {donationTiers.map(amount => (
              <button
                key={amount}
                style={styles.amountButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#3A7BD5'; // On hover, darker blue
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#4C8BF5';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
                onClick={() => setDonationAmount(amount)}
              >
                ${amount}
              </button>
            ))}
          </div>

          <input
            type="number"
            placeholder="Enter custom amount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder="Leave a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={styles.input}
          />

          <button onClick={handleDonation} style={styles.submitButton}>
            Donate ${customAmount || donationAmount}
          </button>
        </div>
      </div>

      <div style={styles.testimonialSection}>
        <div style={styles.testimonialContainer}>
          <h2 style={styles.testimonialTitle}>Impact Stories</h2>
          <div style={styles.testimonialGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} style={styles.testimonialCard}>
                <p style={styles.testimonialQuote}>"{testimonial.quote}"</p>
                <div style={styles.testimonialAuthor}>{testimonial.author}</div>
                <div style={styles.testimonialRole}>{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationPage;
