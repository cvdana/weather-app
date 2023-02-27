function displayCurrentDay(date) {
  let days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
  let months = [
    `Jan`,
    `Feb`,
    `Mar`,
    `Apr`,
    `May`,
    `Jun`,
    `Jul`,
    `Aug`,
    `Sep`,
    `Oct`,
    `Nov`,
    `Dec`,
  ];
  let currentDay = days[date.getDay()];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let newDate = date.getDate();
  let hour = date.getHours();
  let minutes = String(date.getMinutes()).padStart(2, 0);
  let formattedDate = `${currentDay}, ${newDate} ${month} ${year}, ${hour}:${minutes}`;
  return formattedDate;
}
let todayInformation = document.querySelector(`#current-time`);
todayInformation.innerHTML = displayCurrentDay(new Date());

function showTemperature(response) {
  document.querySelector(`#actual-temperature`).innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(`#temperatures`).innerHTML = `${Math.round(
    response.data.main.temp_max
  )}º/${Math.round(response.data.main.temp_min)}º`;
  document.querySelector(
    `#humidity`
  ).innerHTML = `H ${response.data.main.humidity} %`;
  document.querySelector(`#wind`).innerHTML = `W ${Math.round(
    response.data.wind.speed
  )} Km/h`;
  document.querySelector(`#condition`).innerHTML =
    response.data.weather[0].main;
  document.querySelector(`#city`).innerHTML = response.data.name;
}
function search(city) {
  let apiKey = `616903f8fae840aac9dcad7ca42409ed`;
  let url = `https://api.openweathermap.org/data/2.5/weather`;
  let units = `metric`;
  let apiUrl = `${url}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(`#search-city`).value;
  search(city);
}

let searchForm = document.querySelector(`#search-form`);
searchForm.addEventListener(`submit`, handleSubmit);

function retrieveLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `616903f8fae840aac9dcad7ca42409ed`;
  let url = `https://api.openweathermap.org/data/2.5/weather`;
  let units = `metric`;
  let apiUrl = `${url}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(retrieveLocation);
}
let locationPin = document.querySelector(`#location-drop`);
locationPin.addEventListener(`click`, getLocation);
search(`Valencia`);
