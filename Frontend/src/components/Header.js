import { useState, useEffect } from 'react';
import { Brain, Menu, X, User, Bell, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const checkAuth = () => {
      const auth = localStorage.getItem('auth');
      if (auth) {
        const userData = JSON.parse(auth);
        setIsAuthenticated(true);
        setUserType(userData.type);
        setUserName(userData.name);
      }
    };

    window.addEventListener('scroll', handleScroll);
    checkAuth();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setShowProfileDropdown(!showProfileDropdown);
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/ct-scan-upload', label: 'CT Scan Upload' },
    { path: '/blog/create', label: 'Create Blog' },
    { path: '/donate', label: 'Donate' },
    { path: '/educational-content', label: 'Educational Content' },
    { path: '/token-wallet', label: 'Token Wallet' },
  ];

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
    background: scrolled 
      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 248, 240, 0.95))'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 248, 240, 0.8))',
    backdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
    boxShadow: scrolled 
      ? '0 4px 30px rgba(234, 88, 12, 0.08)'
      : 'none',
    borderBottom: scrolled 
      ? '1px solid rgba(234, 88, 12, 0.08)'
      : '1px solid rgba(234, 88, 12, 0.05)',
    '::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at top right, rgba(234, 88, 12, 0.03), transparent 70%)',
      pointerEvents: 'none'
    }
  };

  const navStyle = {
    maxWidth: '1440px',
    margin: '0 auto',
    padding: '0 2rem',
    position: 'relative'
  };

  const navContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '72px'
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'transform 300ms ease',
    ':hover': {
      transform: 'translateY(-1px)'
    }
  };

  const logoIconStyle = {
    width: '48px',
    height: '42px',
    color: '#EA580C',
    filter: 'drop-shadow(0 2px 4px rgba(234, 88, 12, 0.2))',
    transition: 'transform 300ms ease, color 300ms ease',
    ':hover': {
      transform: 'scale(1.05)',
      color: '#C2410C'
    }
  };

  const logoTextStyle = {
    fontSize: '2rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #EA580C 0%, #F97316 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 2px 4px rgba(234, 88, 12, 0.1)',
    transition: 'all 300ms ease'
  };

  const desktopNavStyle = {
    display: 'none',
    alignItems: 'center',
    gap: '3rem',
    '@media (min-width: 1024px)': {
      display: 'flex'
    }
  };

  const linkStyle = (isActive) => ({
    position: 'relative',
    padding: '0.5rem 0',
    fontSize: '0.9375rem',
    fontWeight: '600',
    color: isActive ? '#EA580C' : '#374151',
    transition: 'all 300ms ease',
    cursor: 'pointer',
    textDecoration: 'none',
    ':hover': {
      color: '#EA580C'
    },
    ':after': {
      content: '""',
      position: 'absolute',
      bottom: '-2px',
      left: '50%',
      width: isActive ? '100%' : '0%',
      height: '2px',
      background: 'linear-gradient(90deg, #EA580C, #F97316)',
      transition: 'all 300ms ease',
      transform: 'translateX(-50%)',
      opacity: isActive ? 1 : 0
    },
    ':hover:after': {
      width: '100%',
      opacity: 1
    }
  });

  const actionContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem'
  };

  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(234, 88, 12, 0.1)',
    transition: 'all 300ms ease',
    boxShadow: '0 2px 4px rgba(234, 88, 12, 0.03)',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      border: '1px solid rgba(234, 88, 12, 0.2)',
      boxShadow: '0 4px 6px rgba(234, 88, 12, 0.05)'
    }
  };

  const profileContainerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem'
  };

  const notificationButtonStyle = {
    position: 'relative',
    padding: '0.5rem',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(234, 88, 12, 0.1)',
    cursor: 'pointer',
    transition: 'all 300ms ease',
    boxShadow: '0 2px 4px rgba(234, 88, 12, 0.03)',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      border: '1px solid rgba(234, 88, 12, 0.2)',
      boxShadow: '0 4px 6px rgba(234, 88, 12, 0.05)',
      transform: 'translateY(-1px)'
    }
  };

  const profileButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem',
    borderRadius: '9999px',
    backgroundColor: isAuthenticated 
      ? 'linear-gradient(135deg, #EA580C, #F97316)'
      : 'rgba(255, 255, 255, 0.8)',
    color: isAuthenticated ? 'white' : '#374151',
    border: isAuthenticated 
      ? 'none'
      : '1px solid rgba(234, 88, 12, 0.2)',
    cursor: 'pointer',
    transition: 'all 300ms ease',
    boxShadow: isAuthenticated
      ? '0 4px 6px rgba(234, 88, 12, 0.15)'
      : '0 2px 4px rgba(234, 88, 12, 0.03)',
    ':hover': {
      backgroundColor: isAuthenticated 
        ? 'linear-gradient(135deg, #C2410C, #EA580C)'
        : 'rgba(255, 255, 255, 0.95)',
      transform: 'translateY(-1px)',
      boxShadow: isAuthenticated
        ? '0 6px 8px rgba(234, 88, 12, 0.2)'
        : '0 4px 6px rgba(234, 88, 12, 0.05)'
    }
  };

  const profileImageStyle = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: isAuthenticated ? '#C2410C' : 'rgba(255, 255, 255, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: isAuthenticated ? 'white' : '#9CA3AF',
    border: isAuthenticated
      ? 'none'
      : '1px solid rgba(234, 88, 12, 0.1)',
    boxShadow: '0 2px 4px rgba(234, 88, 12, 0.05)'
  };

  const profileDropdownStyle = {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '0.75rem',
    width: '280px',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '1rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(234, 88, 12, 0.05)',
    border: '1px solid rgba(234, 88, 12, 0.08)',
    padding: '0.75rem',
    display: showProfileDropdown ? 'block' : 'none',
    animation: 'fadeIn 300ms ease',
    backdropFilter: 'blur(12px)',
    transform: 'translateY(0)',
    opacity: 1,
    ':before': {
      content: '""',
      position: 'absolute',
      top: '-6px',
      right: '24px',
      width: '12px',
      height: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      border: '1px solid rgba(234, 88, 12, 0.08)',
      borderRight: 'none',
      borderBottom: 'none',
      transform: 'rotate(45deg)',
      boxShadow: '-2px -2px 4px rgba(0, 0, 0, 0.02)'
    }
  };

  const dropdownItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    color: '#374151',
    fontSize: '0.9375rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 300ms ease',
    ':hover': {
      backgroundColor: 'rgba(234, 88, 12, 0.05)',
      color: '#EA580C',
      transform: 'translateX(4px)'
    }
  };

  return (
    <>
      <header style={headerStyle}>
        <nav style={navStyle}>
          <div style={navContentStyle}>
            <Link 
              to="/" 
              style={logoContainerStyle}
              onClick={() => setActiveLink('/')}
            >
              <Brain style={logoIconStyle} />
              <span style={logoTextStyle}>Alzheimer's Detect</span>
            </Link>

            <div style={desktopNavStyle}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setActiveLink(link.path)}
                  style={linkStyle(activeLink === link.path)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={actionContainerStyle}>
              <div style={searchContainerStyle}>
                <Search style={{ width: '16px', height: '16px', color: '#6B7280' }} />
                <input
                  type="text"
                  placeholder="Search..."
                  style={{
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    fontSize: '0.9375rem',
                    color: '#374151',
                    width: '180px',
                    '::placeholder': {
                      color: '#9CA3AF'
                    }
                  }}
                />
              </div>

              <div style={profileContainerStyle}>
                <button style={notificationButtonStyle}>
                  <Bell style={{ width: '20px', height: '20px', color: '#6B7280' }} />
                  {isAuthenticated && (
                    <span style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#EA580C',
                      border: '2px solid white',
                      boxShadow: '0 0 0 2px rgba(234, 88, 12, 0.2)'
                    }} />
                  )}
                </button>

                <button 
                  onClick={handleProfileClick}
                  style={profileButtonStyle}
                >
                  <div style={profileImageStyle}>
                    <User style={{ width: '20px', height: '20px' }} />
                  </div>
                  {isAuthenticated && (
                    <span style={{
                      fontSize: '0.9375rem',
                      fontWeight: '600',
                      paddingRight: '0.75rem'
                    }}>
                      {userName}
                    </span>
                  )}
                </button>

                {isAuthenticated && (
                  <div style={profileDropdownStyle}>
                    <div style={{
                      padding: '0.75rem 1rem',
                      borderBottom: '1px solid rgba(234, 88, 12, 0.08)',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{ 
                        fontSize: '0.9375rem', 
                        fontWeight: '600', 
                        color: '#111827',
                        marginBottom: '0.25rem'
                      }}>
                        {userName}
                      </div>
                      <div style={{ 
                        fontSize: '0.8125rem', 
                        color: '#6B7280',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#10B981'
                        }} />
                        {userType === 'patient' ? 'Patient Account' : 'Doctor Account'}
                      </div>
                    </div>
                    <div style={dropdownItemStyle}>
                      <User style={{ width: '16px', height: '16px' }} />
                      View Profile
                    </div>
                    <div style={dropdownItemStyle}>
                      Settings
                    </div>
                    <div style={{
                      ...dropdownItemStyle,
                      color: '#DC2626',
                      ':hover': {
                        backgroundColor: 'rgba(254, 242, 242, 0.8)',
                        color: '#DC2626',
                        transform: 'translateX(4px)'
                      }
                    }}>
                      Sign Out
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                ...notificationButtonStyle,
                display: 'block',
                '@media (min-width: 1024px)': {
                  display: 'none'
                }
              }}
            >
              {isMenuOpen ? (
                <X style={{ width: '24px', height: '24px', color: '#6B7280' }} />
              ) : (
                <Menu style={{ width: '24px', height: '24px', color: '#6B7280' }} />
              )}
            </button>
          </div>
        </nav>

        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          borderTop: '1px solid rgba(234, 88, 12, 0.08)',
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          maxHeight: isMenuOpen ? '100vh' : '0',
          opacity: isMenuOpen ? '1' : '0',
          visibility: isMenuOpen ? 'visible' : 'hidden',
          overflow: 'hidden',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 6px rgba(234, 88, 12, 0.05)',
          '@media (min-width: 1024px)': {
            display: 'none'
          }
        }}>
          <div style={{ padding: '1rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => {
                  setActiveLink(link.path);
                  setIsMenuOpen(false);
                }}
                style={{
                  display: 'block',
                  padding: '0.75rem',
                  marginBottom: '0.5rem',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: activeLink === link.path ? '#EA580C' : '#374151',
                  backgroundColor: activeLink === link.path 
                    ? 'rgba(234, 88, 12, 0.05)' 
                    : 'transparent',
                  transition: 'all 300ms ease',
                  ':hover': {
                    backgroundColor: 'rgba(234, 88, 12, 0.03)',
                    color: '#EA580C',
                    transform: 'translateX(4px)'
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
      
      <div style={{ height: '72px' }} />
    </>
  );
};

export default Header;