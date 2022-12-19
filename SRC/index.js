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
let h5 = document.querySelector("h5");
h5.innerHTML = `${hour}:${min} ${Day}, ${month} ${exactDay} ${year}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("#h2Temp");
  h2.innerHTML = temperature;
  let h6 = document.querySelector("h6");
  h6.innerHTML = response.data.weather[0].main;
  document.querySelector("h1").innerHTML = response.data.name;
}

function cityandTemp(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enterCity");
  let h1 = document.querySelector("h1");
  let apiKey = "cc92c7497f4b5296aba156333ba72192";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=cc92c7497f4b5296aba156333ba72192&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
let cityName = document.querySelector("#typename");
cityName.addEventListener("submit", cityandTemp);

function getMyLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showLocation(event) {
  navigator.geolocation.getCurrentPosition(getMyLocation);
}
let showcurrentLocation = document.querySelector("#CurrentLocation");
showcurrentLocation.addEventListener("click", showLocation);
