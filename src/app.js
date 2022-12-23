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
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
  }
  
  function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
  
    celsiusTemp = response.data.temperature.current;
  
    temperatureElement.innerHTML = Math.round(celsiusTemp);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute(
      "src",
      "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
    );
    iconElement.setAttribute("alt", response.data.condition.icon_url);
  }
  
  function search(city) {
    let apiKey = "4372515633ef2c6aat609051o83db044";
    let apiUrl=`https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${apiKey}`;
    axios.get(apiUrl).then(displayTemperature);
  }
  
  function pressSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
  }
  
  function showFahrenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheiTemp = (celsiusTemp * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheiTemp);
  }
  
  function showCelsiusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemp);
  }
  
  let celsiusTemp = null;
  
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", pressSubmit);
  
  let fahrenheitLink = document.querySelector("#fahrenheit-degree");
  fahrenheitLink.addEventListener("click", showFahrenheitTemp);
  
  let celsiusLink = document.querySelector("#celsius-degree");
  celsiusLink.addEventListener("click", showCelsiusTemp);
  
  search("Lisbon");