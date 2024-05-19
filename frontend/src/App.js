import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './App.css'; 
import axios from 'axios';

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

  const renderIcon = (weatherCode)=>{
    if(weatherCode=0){
      return <FontAwesomeIcon icon="fa-solid fa-sun" />;
    }
    else if(weatherCode==1 || weatherCode==2 || weatherCode==3){
      return <FontAwesomeIcon icon="fa-solid fa-cloud-sun" />;
    }
    else if(weatherCode==45 || weatherCode==48 ){
      return <FontAwesomeIcon icon="fa-solid fa-smog" />;
    }
    else if(weatherCode==51 || weatherCode==53 || weatherCode==55 || weatherCode==56 || weatherCode==57){
      return <FontAwesomeIcon icon="fa-solid fa-cloud-sun-rain" />;
    }
    else if(weatherCode==61 || weatherCode==63 || weatherCode==65 || weatherCode==66 || weatherCode==67 || weatherCode==80 || weatherCode==81 || weatherCode==82){
      return <FontAwesomeIcon icon="fa-solid fa-cloud-showers-heavy" />;
    }
    else if(weatherCode==71 || weatherCode==73 || weatherCode==75 || weatherCode==77 || weatherCode==85 || weatherCode==86){
      return <FontAwesomeIcon icon="fa-regular fa-snowflake" />;
    }
    else if(weatherCode==95 || weatherCode==96 || weatherCode==99){
      return <FontAwesomeIcon icon="fa-solid fa-cloud-bolt" />;
    }

  };
  
  return (
    <div className="app">
      <Sidebar onSubmit={fetchWeather} />
      <div className="main-content">
        {weatherInfo && weatherInfo.time && weatherInfo.time.map((date, index) => (
          <div key={index} className="weather-box">
            <h3>{new Date(date).toLocaleDateString()}</h3>
            <p>Temperature Min: {weatherInfo.temperatureMin[index].toFixed(1)}°C</p>
            <p>Temperature Max: {weatherInfo.temperatureMax[index].toFixed(1)}°C</p>
            <p>Weather Code: {weatherInfo.weather_code[index]}</p>
            <p>Sunshine Duration: {(weatherInfo.Energy[index] / 1000).toFixed(1)} hours</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
