import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/MapPage.css';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationUpdater({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);
  return null;
}

function MapPage({ themeColor }) {
  const [position, setPosition] = useState([37.7749, -122.4194]); // Default: San Francisco
  const [locationGranted, setLocationGranted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [nearbyDoctors, setNearbyDoctors] = useState([]);
  
  useEffect(() => {
    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setLocationGranted(true);
          searchNearby(pos.coords.latitude, pos.coords.longitude);
        },
        (error) => {
          console.log('Location access denied:', error);
          setLocationGranted(false);
        }
      );
    }
  }, []);
  
  const searchNearby = (lat, lng) => {
    // Simulate nearby eye care providers
    const mockDoctors = [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        specialty: 'Ophthalmologist',
        address: '123 Main St',
        phone: '(555) 123-4567',
        rating: 4.8,
        distance: '0.5 miles',
        position: [lat + 0.01, lng + 0.01]
      },
      {
        id: 2,
        name: 'Vision Care Center',
        specialty: 'Optometry',
        address: '456 Oak Ave',
        phone: '(555) 234-5678',
        rating: 4.6,
        distance: '1.2 miles',
        position: [lat - 0.01, lng + 0.01]
      },
      {
        id: 3,
        name: 'Dr. Michael Chen',
        specialty: 'Retinal Specialist',
        address: '789 Elm St',
        phone: '(555) 345-6789',
        rating: 4.9,
        distance: '1.8 miles',
        position: [lat + 0.01, lng - 0.01]
      }
    ];
    setNearbyDoctors(mockDoctors);
  };
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
    }
  };
  
  return (
    <div className="map-page">
      <div className="header">
        <div className="icon-circle" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}>
          🗺️
        </div>
        <h1 style={{ color: themeColor }}>Find Eye Care</h1>
        <p className="subtitle">Locate eye doctors and care providers near you</p>
      </div>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for eye doctors, clinics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          onClick={handleSearch}
          style={{ backgroundColor: themeColor }}
        >
          Search
        </button>
      </div>
      
      {!locationGranted && (
        <div className="location-notice">
          <p>📍 Enable location services for better results</p>
        </div>
      )}
      
      <div className="map-container">
        <MapContainer 
          center={position} 
          zoom={13} 
          style={{ height: '400px', width: '100%', borderRadius: '12px' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationUpdater position={position} />
          
          {/* User's location marker */}
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
          
          {/* Nearby doctors markers */}
          {nearbyDoctors.map(doctor => (
            <Marker key={doctor.id} position={doctor.position}>
              <Popup>
                <div>
                  <h4>{doctor.name}</h4>
                  <p>{doctor.specialty}</p>
                  <p>{doctor.address}</p>
                  <p>{doctor.phone}</p>
                  <p>⭐ {doctor.rating} • {doctor.distance}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      <div className="doctors-list">
        <h2>Nearby Eye Care Providers</h2>
        {nearbyDoctors.map(doctor => (
          <div key={doctor.id} className="doctor-card">
            <div className="doctor-info">
              <h3>{doctor.name}</h3>
              <p className="specialty">{doctor.specialty}</p>
              <p className="address">📍 {doctor.address}</p>
              <p className="phone">📞 {doctor.phone}</p>
              <div className="rating">
                <span>⭐ {doctor.rating}</span>
                <span className="distance">{doctor.distance}</span>
              </div>
            </div>
            <div className="doctor-actions">
              <button 
                className="directions-btn"
                style={{ backgroundColor: themeColor }}
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${doctor.position[0]},${doctor.position[1]}`, '_blank')}
              >
                Get Directions
              </button>
              <button 
                className="call-btn"
                onClick={() => window.open(`tel:${doctor.phone}`, '_self')}
              >
                Call
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="info-card">
        <h3>Emergency Eye Care</h3>
        <p>If you experience sudden vision loss, severe eye pain, or eye injury, seek immediate medical attention.</p>
        <button 
          className="emergency-btn"
          onClick={() => window.open('tel:911', '_self')}
        >
          🚨 Call Emergency Services
        </button>
      </div>
    </div>
  );
}

export default MapPage;
