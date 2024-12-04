const apiKey = "50be8ea5d271b0daabdfd3c527199276";
const apiUrl = "https://api.openweathermap.com/data/2.5";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

searchButton.addEventListener("click", () => {
  const location = locationInput.value;
  console.log(location);
  if (location) {
    fetchWeather(location);
  }
});

function fetchWeather(location) {
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
  console.log(url);
  fetch(url)
    .then((weather) => weather.json())
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function displayWeather(weather) {}
