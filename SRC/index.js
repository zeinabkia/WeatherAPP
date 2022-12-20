let now = new Date();
let currentDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let Day = currentDay[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let year = now.getUTCFullYear();
let exactDay = now.getDate();
let hour = now.getHours();
let min = now.getMinutes();
let currentTime = document.querySelector("#date");
currentTime.innerHTML = `${hour}:${min} ${Day}, ${month} ${exactDay} ${year}`;

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return ` ${hours}:${minutes}`;
}

function showTemperature(response) {
  celsiusTemperature = response.data.temperature.current;
  let temperature = Math.round(response.data.temperature.current);
  let h2 = document.querySelector("#h2Temp");
  h2.innerHTML = temperature;
  let h6 = document.querySelector("h6");
  h6.innerHTML = response.data.condition.description;
  let humidityandwind = document.querySelector("#humidityAndwind");
  humidityandwind.innerHTML =
    "Humidity: " +
    response.data.temperature.humidity +
    "%          Wind: " +
    Math.round(response.data.wind.speed) +
    "kmps";
  document.querySelector("h1").innerHTML = response.data.city;
  let weatherIcon = document.querySelector("#mainIcon");
  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  let timeZone = document.querySelector("#timezone");
  timeZone.innerHTML = formatDate(response.data.time * 1000);
}

function cityandTemp(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enterCity");
  let h1 = document.querySelector("h1");
  let apiKey = "e3f5c70f0f06tb1d5a445afb715o7c01";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput.value}&key=e3f5c70f0f06tb1d5a445afb715o7c01&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
let cityName = document.querySelector("#typename");
cityName.addEventListener("submit", cityandTemp);

let celsiusTemperature = null;

function toCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperature = document.querySelector("#h2Temp");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

function toFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let temperature = document.querySelector("#h2Temp");
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", toCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", toFahrenheit);
