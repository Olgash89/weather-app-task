import React, { useEffect, useState } from "react";
import { weatherService } from "../services/weather.service";
import data from "../data/autocomplete.json";
import { utilsService } from "../services/utils.service";
export default function WeatherDetails() {
  const [city, setCity] = useState("tel aviv"); // txt for input
  const [err, setErr] = useState(""); // err to display when txt input is wrong
  const [weatherDays, setWeatherDays] = useState([]); // array of the weather days
  const [cities, setCities] = useState([]); // the autocomplete cities
  const [currWeather, setCurrWeather] = useState(null); //currWeather
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favCities")) || []
  ); //get favorites from localstroage, if empty so empty arrat
  // running when city changed
  const getdata = async () => {
    let regex = /^[A-z]+$/;
    // check if text input is valid
    if (!city && !regex.test(city)) {
      setErr("your input is  not valid");
    } else {
      setErr("");
      console.log("inside else");
      try {
        // get autocomplete cities from api
        const cities = await weatherService.getAutoComplete(city);
        setCities(cities);
      } catch (err) {
        console.log({ err });
      }
    }
  };

  const setWeatherWeek = async (locationKey, cityName) => {
    try {
      //get weather for all week from api
      const weatherDays = await weatherService.get5DaysData(locationKey);
      setWeatherDays(weatherDays);
    } catch (err) {
      console.log({ err });
    }

    try {
      //get  current weather from api
      const currentWeather = await weatherService.getCurrentWeather(
        locationKey
      );
      setCurrWeather({ ...currentWeather[0], cityName });
    } catch (err) {
      console.log({ err });
    }
    setCities([]);
  };

  useEffect(() => {
    if (city.length > 3) getdata();
  }, [city]);

  const toggleFavorite = () => {
    const copy = [...favorites];
    // find the index of the current location
    const idx = copy.findIndex((f) => f.cityName === currWeather.cityName);
    // if not inside favorite:
    if (idx === -1) {
      const city = {
        cityName: currWeather.cityName,
        unit: currWeather.Temperature.Metric.Unit,
        value: currWeather.Temperature.Metric.Value,
        status: currWeather.WeatherText,
      };
      copy.push(city);
      // if inside favorite:
    } else {
      copy.splice(idx, 1);
    }
    localStorage.setItem("favCities", JSON.stringify(copy));
    setFavorites(copy);
  };

  const FarenheitToCelcius = (f) => {
    return ((f - 32) * (5 / 9)).toFixed(2);
  };
  return (
    <div>
      <div className="input">
        <input placeholder="tel-aviv"
          onChange={(ev) => {
            setCity(ev.target.value);
          }}
          type="text"
        />
      </div>
      {err && <p style={{ color: "red" }}>ERROR</p>}
      <div className="main">
        {currWeather && (
          <div className="curr-weather">
            <div>{currWeather.cityName}</div>
            <div>
              {currWeather.Temperature.Metric.Value} &deg;
              {currWeather.Temperature.Metric.Unit}
              </div>
          </div>
        )}

        {cities.map((city) => {
          console.log({ city });
          return (
            <div
              onClick={() => setWeatherWeek(city.Key, city.LocalizedName)}
              key={city.Key}
            >
              {city.LocalizedName}
            </div>
          );
        })}
        {currWeather && (
          <div className="link">
            <button onClick={() => toggleFavorite()}>
              {favorites.find((f) => f.cityName === currWeather.cityName)
                ? "remove from favorites"
                : "add to favorites"}
            </button>
          </div>
        )}
        <img
          id="pic3"
          src="https://media.istockphoto.com/photos/cirrocumulus-clouds-cloudscape-picture-id645173476?s=612x612"
        />
        <div className="flex">
          {weatherDays.map((day) => {
            return (
              <div key={day.Date} className='cur-border'>  
                <div>{utilsService.getday(new Date(day.Date).getDay())}</div>  
                <div>
                  {FarenheitToCelcius(day.Temperature.Maximum.Value)}&deg; C
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


