import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import debounce from "lodash.debounce";

function App() {
  const [city, setCity] = useState("");
  const [forecastData, setForecastData] = useState([]);

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);
  };

  const fetchWeatherData = debounce(async () => {
    if (city) {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=''=${city}&days=5`
      );
      const data = await response.json();
      setForecastData(data.forecast.forecastday);
    }
  }, 1000);

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home city={city} forecastData={forecastData} handleCityChange={handleCityChange} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home({ city, forecastData, handleCityChange }) {
  return (
    <div>
      <h2>Weather Forecast App</h2>
      <label htmlFor="city">Enter city: </label>
      <input type="text" id="city" name="city" value={city} onChange={handleCityChange} />

      <ForecastTable forecastData={forecastData} />
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

function ForecastTable({ forecastData }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Max Temp</th>
          <th>Min Temp</th>
          <th>Avg Temp</th>
          <th>Humidity</th>
        </tr>
      </thead>
      <tbody>
        {forecastData.map((day) => (
          <tr key={day.date}>
            <td>{day.date}</td>
            <td>{day.day.maxtemp_c}&deg;C</td>
            <td>{day.day.mintemp_c}&deg;C</td>
            <td>{day.day.avgtemp_c}&deg;C</td>
            <td>{day.day.avghumidity}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
