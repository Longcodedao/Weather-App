import React from 'react';
import './SummaryCard.css';
import moment from 'moment';

export default function SummaryCard({ day }) {
  const day_icon = `${
    process.env.REACT_APP_ICON_DISPLAY + day.weather[0]['icon']
  }@2x.png`;
  return (
    <li className="summary-items">
      <div>
        <p>{Math.round(day.main.temp)}&deg;C</p>
        <p>
          {day.weather[0].main}
          <img
            src={day_icon}
            alt=""
          />
        </p>

        <p>{day.weather[0].description}</p>
        <p>{moment(day.dt_txt).format('hh:mm a')}</p>
      </div>
    </li>
  );
}
