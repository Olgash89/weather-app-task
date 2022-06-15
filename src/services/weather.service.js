import axios from "axios";
export const weatherService = {
  getAutoComplete,
  get5DaysData,
  getCurrentWeather,
};

const base_url = "http://dataservice.accuweather.com/";
const apikey = "kKZ8rr2bl1JgwbZlNk3YyuEfj1HAr6EM";
async function getAutoComplete(str) {
  const res = await axios.get(`${base_url}/locations/v1/cities/autocomplete`, {
    //Returns basic information about locations matching an autocomplete of the search text.
    params: {
      q: str,
      apikey,
      language: "en-us",
    },
  });
  console.log(JSON.stringify(res)); // only to save the data inside our files because the limit of requests.
  return res.data;
}

async function get5DaysData(locationKey) {
  console.log({ locationKey });
  // const locationKey="kKZ8rr2bl1JgwbZlNk3YyuEfj1HAr6EM"
  // const res = await axios.get(
  //   `${base_url}forecasts/v1/daily/5day/${locationKey}`,
  //   { params: apikey }
  // );
  const res = await axios.get(
    `${base_url}forecasts/v1/daily/5day/${locationKey}?apikey=${apikey}`
  );
  console.log(JSON.stringify(res)); // only to save the data inside our files because the limit of requests.
  return res.data.DailyForecasts;
}

async function getCurrentWeather(locationKey) {
  const res = await axios.get(
    `${base_url}/currentconditions/v1/${locationKey}?apikey=${apikey}`
  );
  console.log(JSON.stringify(res)); // only to save the data inside our files because the limit of requests.  //השיטה ממירה אובייקט או ערך JavaScript למחרוזת JSON
  return res.data;
}
