const apiKey = "7eff60a85f731f91b496928001773a8e";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
async function checkWeather(city){
  const response= await fetch(apiUrl +city+ `&appid=${apiKey}`);
  var data= await response.json();

  document.querySelector(".location").innerHTML=data.name;
  document.querySelector(".temp").innerHTML=Math.round(data.main.temp) +"°C";
  document.querySelector(".humidity").innerHTML=data.main.humidity +"%";
  document.querySelector(".wind").innerHTML=data.wind.speed+"km/hr";
  document.querySelector(".feelslike").innerHTML=Math.round(data.main.feels_like) +"°C";

  document.querySelector(".weather").style.display="block";
}
searchBtn.addEventListener("click",()=>{
  checkWeather(searchBox.value);
  getWeatherForecast();
})


function getWeatherForecast() {
const CITY_NAME = document.getElementById('locationInput').value;
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&cnt=40&appid=${apiKey}`;

const weatherContainer = document.getElementById('weather-container');

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    const weatherData = data.list;
    const weatherCards = [];

    for (let i = 0; i < weatherData.length; i += 8) {
      const weatherInfo = weatherData[i];
      const date = new Date(weatherInfo.dt * 1000);
      const time = `${date.getHours()}:00`;
      const temperature = Math.round(weatherInfo.main.temp - 273.15); // Convert Kelvin to Celsius
      const iconUrl = `http://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png`;

      const card = `
        <div class="weather-card">
          <p>${date.toDateString()}</p>
          <p>${time}</p>
          <img src="${iconUrl}" alt="${weatherInfo.weather[0].description}">
          <p>${weatherInfo.weather[0].description}</p>
          <p>${temperature}°C</p>
        </div>
      `;

      weatherCards.push(card);
    }

    weatherContainer.innerHTML = weatherCards.join('');
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
    weatherContainer.innerHTML = 'Error fetching weather data. Please try again later.';
  });

}

