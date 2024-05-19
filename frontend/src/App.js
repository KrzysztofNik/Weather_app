import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './App.css'; 
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faSmog, faCloudSunRain, faCloudShowersHeavy, faSnowflake, faCloudBolt } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);

  const fetchWeather = async (latitude, longitude) => {
    try {
        
      const response = await axios.post('http://localhost:3001/api/getWeather', new URLSearchParams({latitude, longitude}).toString(),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      const data = response.data;
      console.log(data);
      setWeatherInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderIcon = (weatherCode) => {
    if (weatherCode === 0) {
      return <FontAwesomeIcon icon={faSun} />;
    } else if (weatherCode === 1 || weatherCode === 2 || weatherCode === 3) {
      return <FontAwesomeIcon icon={faCloudSun} />;
    } else if (weatherCode === 45 || weatherCode === 48) {
      return <FontAwesomeIcon icon={faSmog} />;
    } else if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55 || weatherCode === 56 || weatherCode === 57) {
      return <FontAwesomeIcon icon={faCloudSunRain} />;
    } else if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65 || weatherCode === 66 || weatherCode === 67 || weatherCode === 80 || weatherCode === 81 || weatherCode === 82) {
      return <FontAwesomeIcon icon={faCloudShowersHeavy} />;
    } else if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75 || weatherCode === 77 || weatherCode === 85 || weatherCode === 86) {
      return <FontAwesomeIcon icon={faSnowflake} />;
    } else if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
      return <FontAwesomeIcon icon={faCloudBolt} />;
    } else {
      return null;
    }
  };
  
  
  return (
    <div className="app">
      <Sidebar onSubmit={fetchWeather} />
      <div className="main-content">
        {weatherInfo && weatherInfo.time && weatherInfo.time.map((date, index) => (
          <div key={index} className="weather-box">
            <div className="weather-box-content">
              <div className="weather-details">
                <h3>{new Date(date).toLocaleDateString()}</h3>
                <p>Temperature Min: {weatherInfo.temperatureMin[index].toFixed(1)}°C</p>
                <p>Temperature Max: {weatherInfo.temperatureMax[index].toFixed(1)}°C</p>
                <p>Energy produced: {weatherInfo.Energy[index].toFixed(1)} kWh</p>
              </div>
              <div className="weather-icon">
                {renderIcon(weatherInfo.weather_code[index])}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
}

export default App;
