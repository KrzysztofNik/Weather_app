import React, { useState } from 'react';
import './Sidebar.css'; // Import the CSS file for Sidebar styles

function Sidebar({ onSubmit }) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    if (isNaN(lat) || lat < -90 || lat > 90 || isNaN(lon) || lon < -180 || lon > 180) {
      setError('Please enter valid latitude and longitude values.');
    } else {
      setError('');
      onSubmit(latitude, longitude);
    }
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Weather App</h2>
      <form onSubmit={handleSubmit} className="sidebar-form">
        <div className="input-group">
          <label htmlFor="latitude" className="input-label">Latitude:</label>
          <input
            type="text"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="input-field"
            placeholder="Enter latitude"
          />
        </div>
        <div className="input-group">
          <label htmlFor="longitude" className="input-label">Longitude:</label>
          <input
            type="text"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="input-field"
            placeholder="Enter longitude"
          />
        </div>
        {error && <p className="error-box">{error}</p>}
        <button type="submit" className="submit-button">Get Weather</button>      </form>
    </div>
  );
}

export default Sidebar;
