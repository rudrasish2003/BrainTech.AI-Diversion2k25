import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Phone, Clock, AlertCircle } from 'lucide-react';

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your API key

function EmergencyPortal() {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
          // In a real app, you would fetch nearby hospitals from an API here
          // For demo, we'll use mock data
          fetchNearbyHospitals(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setError('Unable to get your location. Please enable location services.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  }, []);

  const fetchNearbyHospitals = (lat, lng) => {
    // Mock data - in a real app, this would be an API call
    const mockHospitals = [
      {
        id: 1,
        name: "City General Hospital",
        distance: 0.8,
        address: "123 Healthcare Ave",
        phone: "+1 (555) 123-4567",
        emergency: true,
        position: { lat: lat + 0.01, lng: lng + 0.01 }
      },
      {
        id: 2,
        name: "St. Mary's Medical Center",
        distance: 1.2,
        address: "456 Medical Blvd",
        phone: "+1 (555) 987-6543",
        emergency: true,
        position: { lat: lat - 0.01, lng: lng - 0.01 }
      },
      {
        id: 3,
        name: "Community Health Center",
        distance: 1.5,
        address: "789 Wellness Way",
        phone: "+1 (555) 246-8135",
        emergency: false,
        position: { lat: lat + 0.015, lng: lng - 0.015 }
      }
    ];
    setNearbyHospitals(mockHospitals);
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: userLocation ? userLocation.lat : 0,
    lng: userLocation ? userLocation.lng : 0,
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '3rem 1rem',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '3rem',
  };

  const sectionStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1.5rem',
    '@media(min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media(min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'box-shadow 0.3s',
    ':hover': {
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    },
  };

  const cardHeaderStyle = {
    padding: '1.5rem',
    borderTop: '4px solid',
    borderTopColor: '#fbbf24', // Default for non-emergency
  };

  const cardTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
  };

  const cardDetailsStyle = {
    padding: '1.5rem',
    color: '#4b5563',
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    padding: '0.75rem 1rem',
    borderRadius: '0.375rem',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
          <AlertCircle style={{ width: '3rem', height: '3rem', color: '#f87171', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>Location Error</h2>
          <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{ backgroundColor: '#4f46e5', color: '#ffffff', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', transition: 'background-color 0.3s' }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <div style={headingStyle}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
            Emergency Medical Services
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
            Finding nearby emergency medical facilities within 2km of your location
          </p>
        </div>

        {userLocation && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden', marginBottom: '2rem' }}>
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={14}
              >
                {/* User's location marker */}
                <Marker
                  position={userLocation}
                  icon={{
                    url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                  }}
                />

                {/* Hospital markers */}
                {nearbyHospitals.map((hospital) => (
                  <Marker
                    key={hospital.id}
                    position={hospital.position}
                    onClick={() => setSelectedHospital(hospital)}
                    icon={{
                      url: hospital.emergency 
                        ? 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
                        : 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
                    }}
                  />
                ))}

                {selectedHospital && (
                  <InfoWindow
                    position={selectedHospital.position}
                    onCloseClick={() => setSelectedHospital(null)}
                  >
                    <div style={{ padding: '1rem' }}>
                      <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '0.5rem' }}>{selectedHospital.name}</h3>
                      <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>{selectedHospital.address}</p>
                      <p style={{ color: '#4f46e5' }}>{selectedHospital.phone}</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        )}

        <div style={gridStyle}>
          {nearbyHospitals.map((hospital) => (
            <div key={hospital.id} style={cardStyle}>
              <div style={{ ...cardHeaderStyle, borderTopColor: hospital.emergency ? '#f87171' : '#fbbf24' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3 style={cardTitleStyle}>
                    {hospital.name}
                  </h3>
                  {hospital.emergency && (
                    <span style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#f87171', backgroundColor: '#fee2e2', borderRadius: '9999px' }}>
                      24/7 Emergency
                    </span>
                  )}
                </div>
              </div>

              <div style={cardDetailsStyle}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <MapPin style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280', marginRight: '0.5rem' }} />
                  <p>{hospital.address}</p>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Clock style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280', marginRight: '0.5rem' }} />
                  <p>{hospital.distance} km away</p>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Phone style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280', marginRight: '0.5rem' }} />
                  <p>{hospital.phone}</p>
                </div>
              </div>

              <button 
                onClick={() => window.open(`tel:${hospital.phone}`)}
                style={buttonStyle}
              >
                <Phone style={{ width: '1.25rem', height: '1.25rem' }} />
                Call Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmergencyPortal;
