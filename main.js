const apiKey = "50be8ea5d271b0daabdfd3c527199276";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

window.onload = function () {
  defaultloc = "Chicago";
  fetchWeather(defaultloc);
  locationElement.innerHTML = defaultloc;
};

searchButton.addEventListener("click", () => {
  const location = locationInput.value;
  locationElement.innerHTML = formatLocation(location);
  console.log(location);
  if (location) {
    fetchWeather(location);
  }
});

function formatLocation(locationString) {
  return locationString
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

async function fetchWeather(location) {
  const url = `${apiUrl}?q=${location}&units=imperial&appid=${apiKey}`;
  console.log(url);

  try {
    console.log("HERE1");
    const wresponse = await fetch(url);
    if (!wresponse.ok) {
      throw new Error(`HTTP error! status: ${wresponse.status}`);
    }
    const weatherInfo = await wresponse.json();
    displayWeather(weatherInfo);
  } catch (err) {
    console.error(err.message);
  }
}

function displayWeather(weather) {
  let temp = weather.main.temp;
  temperatureElement.innerHTML = temp + "°F";

  let desc = weather.weather[0].description;
  descriptionElement.innerHTML = desc.charAt(0).toUpperCase() + desc.slice(1);
}
