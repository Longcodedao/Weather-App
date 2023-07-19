import { useState, useEffect } from 'react';
import { TbMapSearch, TbSearch } from 'react-icons/tb';
import './index.css';
import Header from './components/Header';
import DetailCards from './components/DetailCards';
import SummaryCard from './components/SummaryCard';
function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [noData, setNoData] = useState('No Data Yet!');
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState('Unknown Location');
  const [weatherIcon, setWeatherIcon] = useState(
    `${process.env.REACT_APP_ICON_DISPLAY}10n@2x.png`
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(searchTerm);
  };

  useEffect(function () {
    setWeatherData(JSON.parse(localStorage.getItem('weather')) || []);
    setSearchTerm(localStorage.getItem('location') || '');
    setCity(localStorage.getItem('city') || 'Unknown Location');
  }, []);

  useEffect(
    function () {
      if (city !== '' && weatherData !== '' && searchTerm !== '') {
        localStorage.setItem('weather', JSON.stringify(weatherData));
        localStorage.setItem('location', searchTerm);
        localStorage.setItem('city', city);
      }
    },
    [city, weatherData, searchTerm]
  );

  const getWeather = async (location) => {
    setWeatherData([]);

    let query =
      typeof location === 'string'
        ? `q=${location}`
        : `lat=${location[0]}&lon=${location[1]}`;

    try {
      console.log(query);
      const response = await fetch(
        `${
          process.env.REACT_APP_URL + query
        }&appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`
      );
      const data = await response.json();
      if (data.cod !== '200') {
        setNoData('Location not founded');
        return;
      }
      setWeatherData(data);
      setCity(`${data.city.name}, ${data.city.country}`);
      setWeatherIcon(
        `${
          process.env.REACT_APP_ICON_DISPLAY + data.list[0].weather[0]['icon']
        }@4x.png`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const myIP = (location) => {
    const { latitude, longitude } = location.coords;
    getWeather([latitude, longitude]);
  };

  return (
    <div className="container">
      <div
        className="blur"
        id="blur1"
      ></div>
      <div
        className="blur"
        id="blur2"
      ></div>

      <div className="content">
        <div className="form-container">
          <div className="name">
            <div className="logo">Weather-app Long</div>
            <div className="city">
              <TbMapSearch />
              <p>{city}</p>
            </div>
          </div>

          <div className="search">
            <h2>The Only Weather App You Need!</h2>
            <br />

            <Search
              handleSearch={handleChange}
              searchTerm={searchTerm}
              onSubmit={handleSubmit}
            >
              <TbSearch
              // onClick={() => {
              //   navigator.geolocation.getCurrentPosition(myIP);
              // }}
              />
              {/* <p>Hello World</p> */}
            </Search>
          </div>
        </div>

        <div className="info-container">
          <Header />
          {weatherData.length === 0 ? (
            <div>
              <div className="nodata">
                <h1>{noData}</h1>
              </div>
            </div>
          ) : (
            <>
              <h1>Today</h1>
              <DetailCards
                weather_icon={weatherIcon}
                data={weatherData}
              />
              <h1 className="title">More on {city}</h1>

              <ul className="summary">
                {weatherData.list.map((days, index) => {
                  if (index > 0) {
                    return (
                      <SummaryCard
                        key={index}
                        day={days}
                      />
                    );
                  }
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Search({ handleSearch, searchTerm, onSubmit, children }) {
  return (
    <>
      <form
        className="search-bar"
        noValidate
        onSubmit={onSubmit}
      >
        <input
          type="text"
          placeholder="Enter a city..."
          onChange={handleSearch}
          value={searchTerm}
          required
        />
        <button className="s-icon">{children}</button>
      </form>
    </>
  );
}

export default App;
