import { useState, useEffect } from 'react';
import { Activity, BookOpen,  Stethoscope, Brain, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const handleEducationalContentClick = () => {
    navigate('/educational-content');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCards(prev => prev < 3 ? prev + 1 : prev);
    }, 800);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleProviderPortalClick = () => {
    // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    navigate('/emergency');
    // if (isLoggedIn) {
     
    // } else {
    //   navigate('/login');
    // }
  };

  const parallaxOffset = -scrollY * 0.3;

  const cardStyle = (index) => ({
    width: '100%',
    padding: '2.5rem',
    borderRadius: '1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(79, 70, 229, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    opacity: index < visibleCards ? 1 : 0,
    transform: index < visibleCards ? 'translateY(0)' : 'translateY(50px)',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid rgba(79, 70, 229, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    ':before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #4f46e5, #818cf8)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    ':hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.08), 0 8px 20px rgba(79, 70, 229, 0.12)',
      '::before': {
        opacity: 1,
      },
    },
    cursor: 'pointer'
  });

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      color: '#1a1a1a',
      fontFamily: 'Inter, system-ui, sans-serif',
      overflowX: 'hidden'
    }}>
      {/* Hero Section */}
      <section style={{
        width: '100%',
        marginTop: '4px',
        padding: '8rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(147, 197, 253, 0.1) 100%)',
        minHeight: '100vh'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=2000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.899,
          transform: `translateY(${parallaxOffset}px)`,
        }} />

        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, transparent 0%, #f8fafc 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>
          <Brain size={64} style={{ 
            color: '#4f46e5',
            marginBottom: '2rem',
            filter: 'drop-shadow(0 4px 8px rgba(79, 70, 229, 0.3))',
          }} />

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            marginBottom: '1.5rem',
            color: '#1e1b4b',
            lineHeight: '1.2',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #4f46e5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}>
            Early Detection for Better Care
          </h1>

          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
            color: '#4a5568',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            lineHeight: '1.8',
            padding: '0 1rem',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          }}>
            Advanced AI-powered platform for early detection and monitoring of Alzheimer's disease. 
            Our cutting-edge technology empowers healthcare providers with precise diagnostics and 
            personalized care plans for better patient outcomes.
          </p>

          <div style={{
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '4rem',
          }}>
            <button style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)',
              color: 'white',
              padding: '1.25rem 2.5rem',
              borderRadius: '1rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.125rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 10px 20px rgba(79, 70, 229, 0.2), 0 6px 6px rgba(79, 70, 229, 0.1), 0 0 0 1px rgba(79, 70, 229, 0.1)',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 20px 30px rgba(79, 70, 229, 0.3), 0 10px 10px rgba(79, 70, 229, 0.15), 0 0 0 2px rgba(79, 70, 229, 0.2)',
              }
            }}>
              Start Assessment <ArrowRight size={20} />
            </button>
            <button style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#4f46e5',
              padding: '1.25rem 2.5rem',
              borderRadius: '1rem',
              border: '2px solid rgba(79, 70, 229, 0.2)',
              cursor: 'pointer',
              fontSize: '1.125rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(79, 70, 229, 0.05)',
              ':hover': {
                backgroundColor: 'white',
                borderColor: '#4f46e5',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 12px rgba(79, 70, 229, 0.1)',
              }
            }}  onClick={handleEducationalContentClick}>
              Learn More
            </button>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            marginTop: '2rem',
          }}>
            {[
              { number: '98%', text: 'Detection Accuracy' },
              { number: '50k+', text: 'Patients Helped' },
              { number: '200+', text: 'Healthcare Partners' },
            ].map((stat, index) => (
              <div key={index} style={{
                textAlign: 'center',
                animation: `fadeIn 0.5s ease ${index * 0.2}s forwards`,
                opacity: 0,
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: '#4f46e5',
                  marginBottom: '0.5rem',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                  fontWeight: '500',
                }}>
                  {stat.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        width: '100%',
        padding: '8rem 1rem',
        backgroundColor: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.2), transparent)',
        }} />

        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          textAlign: 'center',
          marginBottom: '4rem',
          color: '#1e1b4b',
          fontWeight: '800',
          position: 'relative',
        }}>
          Comprehensive Care Platform
          <div style={{
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #4f46e5, #818cf8)',
            margin: '1.5rem auto 0',
            borderRadius: '2px',
          }} />
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 1rem',
        }}>
          <div style={cardStyle(0)}>
            <div style={{
              width: '100%',
              height: '240px',
              position: 'relative',
              marginBottom: '2rem',
              borderRadius: '1rem',
              overflow: 'hidden',
            }}>
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1000&q=80"
                alt="Patient Monitoring"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  ':hover': {
                    transform: 'scale(1.05)',
                  }
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)',
              }} />
            </div>
            <Activity size={40} style={{ 
              color: '#4f46e5',
              marginBottom: '1.5rem',
              filter: 'drop-shadow(0 2px 4px rgba(79, 70, 229, 0.2))',
            }} />
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#1e1b4b',
            }}>
              Patient Monitoring
            </h3>
            <p style={{
              color: '#4a5568',
              lineHeight: 1.8,
              fontSize: '1.125rem',
            }}>
              Continuous monitoring and assessment of cognitive function with advanced AI algorithms.
              Real-time tracking and early warning systems for optimal care management.
            </p>
          </div>

          <div 
            style={cardStyle(1)}
            onClick={handleProviderPortalClick}
          >
            <div style={{
              width: '100%',
              height: '240px',
              position: 'relative',
              marginBottom: '2rem',
              borderRadius: '1rem',
              overflow: 'hidden',
            }}>
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80"
                alt="Healthcare Provider Portal"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  ':hover': {
                    transform: 'scale(1.05)',
                  }
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)',
              }} />
            </div>
            <Stethoscope size={40} style={{ 
              color: '#4f46e5',
              marginBottom: '1.5rem',
              filter: 'drop-shadow(0 2px 4px rgba(79, 70, 229, 0.2))',
            }} />
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#1e1b4b',
            }}>
              Healthcare Provider Portal
            </h3>
            <p style={{
              color: '#4a5568',
              lineHeight: 1.8,
              fontSize: '1.125rem',
            }}>
              Comprehensive tools for healthcare providers to manage and monitor patient progress
              with detailed analytics and customizable care plans.
            </p>
          </div>

          <div style={cardStyle(2, handleEducationalContentClick)}
           onClick={handleEducationalContentClick}>
            <div style={{
              width: '100%',
              height: '240px',
              position: 'relative',
              marginBottom: '2rem',
              borderRadius: '1rem',
              overflow: 'hidden',
            }}>
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80"
                alt="Educational Resources"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  ':hover': {
                    transform: 'scale(1.05)',
                  }
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)',
              }} />
            </div>
            <BookOpen size={40} style={{ 
              color: '#4f46e5',
              marginBottom: '1.5rem',
              filter: 'drop-shadow(0 2px 4px rgba(79, 70, 229, 0.2))',
            }} />
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#1e1b4b',
            }}>
              Educational Resources
            </h3>
            <p style={{
              color: '#4a5568',
              lineHeight: 1.8,
              fontSize: '1.125rem',
            }}>
              Access to latest research, treatment guidelines, and comprehensive patient
              education materials for informed care decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{
        width: '100%',
        padding: '8rem 1rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=2000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
          transform: `translateY(${parallaxOffset * 0.5}px)`,
        }} />

        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.95), rgba(67, 56, 202, 0.95))',
        }} />

        <div style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          color: 'white',
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
            fontWeight: '800',
            marginBottom: '1.5rem',
            lineHeight: '1.2',
          }}>
            Join the Fight Against Alzheimer's
          </h2>
          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            opacity: 0.9,
            lineHeight: '1.8',
          }}>
            Start using our platform today and contribute to better outcomes for Alzheimer's patients.
            Together, we can make a difference in the lives of millions affected by this condition.
          </p>
          <button style={{
            backgroundColor: 'white',
            color: '#4f46e5',
            padding: '1.5rem 3rem',
            borderRadius: '1rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.25rem',
            fontWeight: '700',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            ':hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 20px 30px rgba(0, 0, 0, 0.15)',
            }
          }}>
            Get Started Now <ArrowRight size={24} />
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;