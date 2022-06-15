import React from "react";

export default function Favorites() {
  const favorites = JSON.parse(localStorage.getItem("favCities"))||[];
  console.log({favorites});


  return (
    <div>
      <div className="flex2">
      {favorites.map((fav, idx) => {
        return (
          <div key={idx} className="curr-weather">
            <div>{fav.cityName} </div>
            <div>
            {fav.value} &deg;
            {fav.unit}
            </div>{fav.status}</div>
        );
      })}
      </div>
    </div>
  );
}
