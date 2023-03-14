function displayCurrentDay(timestamp) {
  let date = new Date(timestamp);
  let dateNumber = date.getDate();
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
  let hour = date.getHours();
  let minutes = String(date.getMinutes()).padStart(2, 0);
  let formattedDate = `${currentDay}, ${dateNumber} ${month} ${year}, ${hour}:${minutes}`;
  return formattedDate;
}
function formatDate(time) {
  let date = new Date(time * 1000);
  let dateNumber = date.getDate();
  let days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
  let currentDay = days[date.getDay()];
  let finalDate = `${currentDay}, ${dateNumber}`;
  return finalDate;
}
function getWeeklyForecast(coordinates) {
  let apiKey = `94413t4dbc141o4dc71ce00caf84f31e`;
  let units = `metric`;
  let url = `https://api.shecodes.io/weather/v1/forecast`;
  let apiUrl = `${url}?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  celsiusTemperature = response.data.temperature.current;
  document.querySelector(`#actual-temperature`).innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector(`#temperatures`).innerHTML = `Feels like ${Math.round(
    response.data.temperature.feels_like
  )}º`;
  document.querySelector(
    `#humidity`
  ).innerHTML = `Humidity: ${response.data.temperature.humidity} %`;
  document.querySelector(`#wind`).innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} Km/h`;
  document.querySelector(`#condition`).innerHTML =
    response.data.condition.description;
  document.querySelector(`#city`).innerHTML = response.data.city;
  document.querySelector(`#current-time`).innerHTML = displayCurrentDay(
    response.data.time * 1000
  );
  document
    .querySelector(`#main-icon`)
    .setAttribute(
      `src`,
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  document
    .querySelector(`#main-icon`)
    .setAttribute(`alt`, response.data.condition.description);
  getWeeklyForecast(response.data.coordinates);
}
function search(city) {
  let apiKey = `94413t4dbc141o4dc71ce00caf84f31e`;
  let url = `https://api.shecodes.io/weather/v1/current`;
  let units = `metric`;
  let apiUrl = `${url}?query=${city}&key=${apiKey}&units=${units}`;
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
  let apiKey = `94413t4dbc141o4dc71ce00caf84f31e`;
  let url = `https://api.shecodes.io/weather/v1/current`;
  let units = `metric`;
  let apiUrl = `${url}?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(retrieveLocation);
}
let locationPin = document.querySelector(`#location-drop`);
locationPin.addEventListener(`click`, getLocation);
function transormUnits() {
  function changeFahrenheit(event) {
    event.preventDefault();
    let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
    document.querySelector(`#actual-temperature`).innerHTML =
      Math.round(fahrenheitTemp);
  }
  function changeCelsius(event) {
    event.preventDefault();
    let celsiusTemp = document.querySelector(`#actual-temperature`);
    celsiusTemp.innerHTML = Math.round(celsiusTemperature);
  }

  let fahrenheit = document.querySelector(`#fahrenheit-link`);
  fahrenheit.addEventListener(`click`, changeFahrenheit);
  let celsius = document.querySelector(`#celsius-link`);
  celsius.addEventListener(`click`, changeCelsius);
}
transormUnits();
search(`Valencia`);
function displayForecast(response) {
  console.log(response.data);
  let weeklyForecast = response.data.daily;
  let forecastElemant = document.querySelector(`#weekly`);
  let forecastHTML = `<div class="row">`;
  weeklyForecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
                    <div class="border border-3 rounded-pill col">
                      <div class="weather-daily-date">
                        ${formatDate(forecastDay.time)} <br /><img
                          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                            forecastDay.condition.icon
                          }.png"
                          alt="response.data.condition.description"
                          class="icon"
                        /><br />
                        <span class="max-temperature-day">${Math.round(
                          forecastDay.temperature.maximum
                        )}º</span>/<span
                          class="min-temperature-day"
                          >${Math.round(forecastDay.temperature.minimum)}º</span
                        >
                      </div>
                    </div>
                    `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElemant.innerHTML = forecastHTML;
}
displayForecast();
const triggerTabList = document.querySelectorAll("#myTab button");
triggerTabList.forEach((triggerEl) => {
  const tabTrigger = new bootstrap.Tab(triggerEl);

  triggerEl.addEventListener("click", (event) => {
    event.preventDefault();
    tabTrigger.show();
  });
});
