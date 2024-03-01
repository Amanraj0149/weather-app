import React, { useState } from 'react'
import './Weatherapp.css'

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
const Weatherapp = () => {
  const [wicon, setwicon] = useState(cloud_icon); // State for weather icon
  const [weatherData, setWeatherData] = useState({
    humidity: "0%",
    windSpeed: "0km/h",
    temperature: "0°C",
    location: "Unknown"
  });

  const api_key = "7c9727b9f7744dfa17cb26d05c9163c9";

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      setWeatherData({
        humidity: `${data.main.humidity}%`,
        windSpeed: `${data.wind.speed}km/h`,
        temperature: `${data.main.temp}°C`,
        location: data.name
      });

      // Update weather icon based on weather condition
      const iconCode = data.weather[0].icon;
      switch (iconCode) {
        case "01d":
        case "01n":
          setwicon(clear_icon);
          break;
        case "02d":
        case "02n":
          setwicon(cloud_icon);
          break;
        case "03d":
        case "03n":
        case "04d":
        case "04n":
          setwicon(drizzle_icon);
          break;
        case "09d":
        case "09n":
        case "10d":
        case "10n":
          setwicon(rain_icon);
          break;
        case "13d":
        case "13n":
          setwicon(snow_icon);
          break;
        default:
          setwicon(cloud_icon);
          break;
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type="text" className="cityInput" placeholder='Search' />
        <div className="search_icon" onClick={search}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">{weatherData.temperature}</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-conatiner">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percentage">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed}</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Weatherapp