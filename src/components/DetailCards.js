import moment from 'moment';
import React from 'react';
import './DetailCards.css';

export default function DetailCards({ weather_icon, data }) {
  const { clouds, main, weather } = data.list[0];

  return (
    <div className="details">
      <div className="clouds">
        <p className="celsius">{Math.round(main.temp)}&deg;C</p>
        <div className="clouds-icon">
          {weather[0].main}
          <img
            src={weather_icon}
            alt=""
          />
        </div>
        <div className="des">{weather[0].description}</div>
        <div className="time">{moment().format('dddd MM YYYY')}</div>
      </div>

      <div className="more-info">
        <p>RealFell: {Math.round(main.feels_like)}&deg;C</p>
        <p>Humidity: {main.humidity}</p>
        <p>Cloud Cover: {clouds.all}</p>
        <p>Min Temp: {Math.round(main.temp_min)}&deg;C</p>
        <p>Max Temp: {Math.round(main.temp_max)}&deg;C</p>
      </div>
    </div>
  );
}
