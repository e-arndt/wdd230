// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const forecastTemp = document.querySelector('#forecast-temp');

// API URL
const url = 'https://pro.openweathermap.org/data/2.5/forecast/daily?lat=47.309&lon=-122.379&cnt=7&appid=65d0e9402f1db45c754b9f6c31b07398&units=imperial';


async function fetchTrierWeather() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // Testing only
      displayResults(data); // Display results
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  // Display current weather (using first day's data as current weather)
  const firstDay = data.list[0];
  currentTemp.innerHTML = `${firstDay.temp.day.toFixed(1)}&deg;F`;

  const iconsrc = `https://openweathermap.org/img/w/${firstDay.weather[0].icon}.png`;
  const desc = firstDay.weather[0].description;

  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = `${desc}`;

  // Build the 3-day forecast display
  data.list.slice(0, 3).forEach((day, index) => {
    const forecastDate = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const maxTemp = day.temp.max.toFixed(1);
    const minTemp = day.temp.min.toFixed(1);
    const forecastIcon = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;
    const forecastDesc = `${forecastDate}: <span style="color: red;">High ${maxTemp}&deg;F</span>, <span style="color: blue;">Low ${minTemp}&deg;F</span>`;


    // Update each forecast item dynamically
    document.querySelector(`#forecast-icon${index + 1}`).setAttribute('src', forecastIcon);
    document.querySelector(`#forecast-icon${index + 1}`).setAttribute('alt', day.weather[0].description);
    document.querySelector(`#forecast-caption${index + 1}`).innerHTML = forecastDesc;
  });
}





// Fetch the weather data
fetchTrierWeather();
