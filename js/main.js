const apiKey = "50be8ea5d271b0daabdfd3c527199276";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const feelsElement = document.getElementById("feelsLike");
const backgroundWeatherElement = document.getElementById("weatherElement");

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

window.onload = function () {
  defaultloc = "Chicago";
  fetchWeather(defaultloc);
  locationElement.innerHTML = defaultloc;
};

searchButton.addEventListener("click", () => {
  // if (locationInput.value === !null) {
  //   const location = locationInput.value;
  // } else {
  //   const location = "warren";
  // }
  const location = locationInput.value;
  console.log(location);
  if (location === "") {
    alert("Please enter a location! It doesn't work if you don't try!");
    return;
  } else {
    const location = locationInput.value;
    locationInput.value = "";
  }

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
  temperatureElement.innerHTML = "Current Temp: " + temp + "°F";

  let feel = weather.main.feels_like;
  feelsElement.innerHTML = "Feels like: " + feel + "°F";

  let desc = weather.weather[0].description;
  descriptionElement.innerHTML = desc.charAt(0).toUpperCase() + desc.slice(1);

  let weatherCode = weather.weather[0].id;

  let parentCode = Number(weatherCode.toString()[0]);
  console.log(parentCode);
  switch (parentCode) {
    case 2:
      backgroundWeatherElement.style.backgroundImage =
        "../weather_imgs/thunderstorm.jpg";
      break;
    case 3:
      backgroundWeatherElement.style.backgroundImage =
        "../weather_imgs/drizzle.jpg";
      break;
    case 5:
      backgroundWeatherElement.style.backgroundImage =
        "../weather_imgs/rain.jpg";
      break;
    case 6:
      backgroundWeatherElement.style.backgroundImage =
        "../weather_imgs/snow.jpg";
      break;
    case 7:
      backgroundWeatherElement.style.backgroundImage =
        "../weather_imgs/fog.jpg";
      break;
    case 8:
      console.log("800 Code!");
      backgroundWeatherElement.style.backgroundImage =
        "../weather_imgs/clouds.jpg";
      break;
    default:
      backgroundWeatherElement.style.backgroundImage =
        "../weather_imgs/default.jpg";
      break;
  }
}
