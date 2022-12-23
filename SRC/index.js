function liveTime() {
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
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let second = now.getSeconds();
  if (second < 10) {
    second = `0${second}`;
  }
  let currentTime = document.querySelector("#date");
  currentTime.innerHTML = `${hour}:${min}:${second} ${Day}, ${month} ${exactDay}, ${year}`;
}

function formatDay(timestamp) {
  let fDate = new Date(timestamp * 1000);
  let fDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return fDays[fDate.getDay()];
}

function displayforecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="container text-center forecastTable">`;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
      <div class="row">
  <div class="col">${formatDay(forecastDay.time)}</div>
  <div class="col " id="minmax">
    ${Math.round(forecastDay.temperature.maximum)}°
    <span id="min"> ${Math.round(forecastDay.temperature.minimum)}°</span>
  </div>
  <div class="col">
    <img
      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
        forecastDay.condition.icon
      }.png"
      width="30"
    />
  </div>
</div>
      `;
  });

  forecastElement.innerHTML = forecastHTML + `</div>`;
}

function getForecast(cityName) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=e3f5c70f0f06tb1d5a445afb715o7c01&units=metric`;
  axios.get(apiUrl).then(displayforecast);
}

function formatDate(formatted) {
  let date = new Date(formatted);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let localDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  localDay = localDay[date.getDay()];
  return ` ${localDay}  ${hours}:${minutes}`;
}

function showLocalTime(response) {
  let theCityTime = document.querySelector("#timezone");
  theCityTime.innerHTML = formatDate(response.data.formatted);
}

function getlocalTime(coordinates) {
  let apiU = `https://api.timezonedb.com/v2.1/get-time-zone?key=17XRENCNP355&format=json&by=position&lat=${coordinates.latitude}&lng=${coordinates.longitude}`;
  axios.get(apiU).then(showLocalTime);
}
function showTemperature(response) {
  city = response.data.city;
  celsiusTemperature = response.data.temperature.current;
  let temperature = Math.round(response.data.temperature.current);
  let h2 = document.querySelector("#h2Temp");
  let h6 = document.querySelector("h6");
  let humidityandwind = document.querySelector("#humidityAndwind");
  let weatherIcon = document.querySelector("#mainIcon");
  h2.innerHTML = temperature;
  h6.innerHTML = response.data.condition.description;
  humidityandwind.innerHTML =
    "Humidity: " +
    response.data.temperature.humidity +
    "%          Wind: " +
    Math.round(response.data.wind.speed) +
    "mps";
  document.querySelector("h1").innerHTML = response.data.city;
  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  getForecast(city);
  getlocalTime(response.data.coordinates);
}

function findCity(cityName) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=e3f5c70f0f06tb1d5a445afb715o7c01&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function submitCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enterCity");
  findCity(cityInput.value);
}

function toCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#h2Temp");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

function toFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let temperature = document.querySelector("#h2Temp");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

function toFahrenheitF(event) {
  event.preventDefault();
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=e3f5c70f0f06tb1d5a445afb715o7c01&units=imperial`;
  axios.get(apiUrl).then(displayforecast);
}

function toCelsiusF(event) {
  event.preventDefault();
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=e3f5c70f0f06tb1d5a445afb715o7c01&units=metric`;
  axios.get(apiUrl).then(displayforecast);
}

function callbothFahrenheitF(event) {
  toFahrenheit(event);
  toFahrenheitF(event);
}

function callbothCelsius(event) {
  toCelsius(event);
  toCelsiusF(event);
}

let cityName = document.querySelector("#typename");
cityName.addEventListener("submit", submitCity);
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", callbothCelsius);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", callbothFahrenheitF);
let celsiusTemperature = null;
setInterval(liveTime, 1000);
let city = "Tehran";
findCity(city);
