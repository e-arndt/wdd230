const apiKey = '032b36ea99f94242ab36ea99f93242eb';
const stationId = "KWAFEDER5";
const baseUrl = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=e&apiKey=${apiKey}`;

const forecastApiKey = '65d0e9402f1db45c754b9f6c31b07398';
const forecastBaseUrl = 'https://pro.openweathermap.org/data/2.5/forecast/daily?lat=47.309&lon=-122.379&cnt=7&units=imperial&appid=' + forecastApiKey;


let updateTimer;

async function fetchWeatherData() {
    try {
        const response = await fetch(baseUrl);
        console.log("API Response: ", response);
        if (response.ok) {
            const data = await response.json();
            console.log("Parsed Data: ", data); // Log the parsed JSON data
            console.log("Observations: ", data.observations);

            const observation = data.observations[0];
            console.log("Observation Object: ", observation); // Log the specific observation data

            // Update HTML with observation data
            document.getElementById("temperature").textContent = observation.imperial.temp;

            const lastUpdate = new Date(observation.obsTimeLocal);
            console.log("Last Update Time: ", lastUpdate); // Log the last update time
            const currentHour = lastUpdate.getHours(); // Extract the current hour (0-23)
            console.log("Current Hour: ", currentHour); // Log current hour extracted from timestamp

            // Call the guessCurrentCondition function and update HTML with the returned condition
            const currentCondition = guessCurrentCondition(observation, currentHour);
            console.log("Result of Current Condition: ", currentCondition); // Log the computed condition
            document.getElementById("current-condition").textContent = currentCondition;


        } else {
            console.error('Error fetching data from API. Status: ', response.statusText);
        }
    } catch (error) {
        console.error('Unexpected error occurred during API fetch:', error.message);
        
    }
    
}



async function fetch3DayForecast() {
    try {
        const response = await fetch(forecastBaseUrl);
        console.log("Forecast API Response: ", response);
        if (response.ok) {
            const data = await response.json();
            console.log("Parsed Forecast Data: ", data);
            update3DayForecast(data.list.slice(0, 3)); // Process and update the forecast for 3 days
        } else {
            console.error('Error fetching forecast data from API. Status: ', response.statusText);
        }
    } catch (error) {
        console.error('Unexpected error occurred during forecast API fetch:', error.message);
    }
}


function update3DayForecast(forecastData) {
    forecastData.forEach((day, index) => {
        const forecastDate = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const maxTemp = day.temp.max.toFixed(0); // Corrected for the actual data structure
        const minTemp = day.temp.min.toFixed(0); // Corrected for the actual data structure
        const forecastIcon = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;
        const forecastDesc = `${forecastDate}: <span style="color: red;">High ${maxTemp}&deg;F</span>, <span style="color: blue;">Low ${minTemp}&deg;F</span>`;

        // Dynamically update HTML content
        document.querySelector(`#forecast-icon${index + 1}`).setAttribute('src', forecastIcon);
        document.querySelector(`#forecast-icon${index + 1}`).setAttribute('alt', day.weather[0].description);
        document.querySelector(`#forecast-caption${index + 1}`).innerHTML = forecastDesc;
    });
}



function guessCurrentCondition(observation, currentHour) {
    console.log("Observation Passed to guessCurrentCondition: ", observation);
    console.log("Current Hour Passed: ", currentHour); // No more errors


    const temperature = observation.imperial.temp || 0; // Default to 0 if undefined
    console.log("Temperature: ", temperature); // Log temperature
    
    const humidity = observation.humidity || 0; // Default to 0 if undefined
    console.log("Humidity: ", humidity); // Log humidity
    
    const windSpeed = observation.imperial.windSpeed;
    console.log("Wind Speed: ", windSpeed); // Log wind speed

    const solarRadiation = observation.solarRadiation || 0; // Default to 0 if undefined
    console.log("Solar Radiation: ", solarRadiation); // Log solar radiation
    
    const uvIndex = observation.uv;
    console.log("UV Index: ", uvIndex); // Log UV index
    
    const precipRate = observation.imperial.precipRate;
    console.log("Precipitation Rate: ", precipRate); // Log precipitation rate
    
    const windGust = observation.imperial.windGust;
    console.log("Wind Gust: ", windGust); // Log wind gust

    let condition = "";

    if (precipRate > 0 && precipRate <= .025) {
        condition = (temperature <= 33 && humidity >= 75) ? "❄️ Light Snow" : "🌧️ Misting";
    } else if (precipRate > .025 && precipRate <= .04) {
        condition = (temperature <= 33 && humidity >= 75) ? "❄️ Snowfall" : "🌧️ Drizzling";
    } else if (precipRate > .04 && precipRate <= .07) {
        condition = (temperature <= 33 && humidity >= 75) ? "❄️ Snowfall" : "🌧️ Light Rain";
    } else if (precipRate > .07 && precipRate <= .25) {
        condition = (temperature <= 33 && humidity >= 75) ? "❄️ Moderate Snow" : "🌧️ Raining";
    } else if (precipRate > .25 && precipRate <= .35) {
        condition = (temperature <= 33 && humidity >= 75) ? "❄️ Heavy Snow" : "🌧️ Moderate Rain";
    } else if (precipRate > .35 && precipRate <= .50) {
        condition = (temperature <= 33 && humidity >= 75) ? "❄️ Very Heavy Snow" : "🌧️ Heavy Rain";
    } else if (precipRate > .50 && precipRate <= .65) {
        condition = (temperature <= 33 && humidity >= 75) ? "❄️ Near Blizzard Snow" : "🌧️ Very Heavy Rain";
    } else if (precipRate > .65 && precipRate <= .75) {
        condition = (temperature <= 33 && humidity >= 75) ? "❄️ Blizzard Snow" : "🌧️ Downpour";
    } else if (precipRate > .75 && precipRate <= .85) {
        condition = (temperature <= 33 && humidity >= 75) ? "❄️ Heavy Blizzard Snow" : "🌧️ Heavy Downpour";
    } else if (precipRate > .85 && precipRate <= 1.0) {
        condition = (temperature <= 33 && humidity >= 75) ? "❄️ Heavy Blizzard Snow" : "🌧️ Torrential Downpour";
    } else if (precipRate > 1.0 && precipRate <= 1.5) {
        condition = (temperature <= 33 && humidity >= 75) ? "❄️ Whiteout Snow" : "🌧️ Heavy Torrential Downpour";
    } else if (precipRate > 1.5) {
        condition = (temperature <= 33 && humidity >= 75) ? "❄️ Whiteout Snow" : "🌧️ Extreme Torrential Downpour";
    } else if (windSpeed > 30) {
        condition = "💨 Gale Force Winds";
    } else if (windSpeed > 25 && windSpeed <= 30) {
        condition = "💨 Strong Storm Winds";
    } else if (windGust > 25) {
        condition = "💨 Gale Force Gusts";
    } else if (windSpeed > 17 && windSpeed <= 25) {
        condition = "💨 Stormy Winds";
    } else if (windGust > 19 && windGust <= 25) {
        condition = "💨 Strong Storm Gusts";
    } else if (windSpeed > 13 && windSpeed <= 17) {
        condition = "💨 Strong Winds";
    } else if (windGust > 14 && windGust <= 19) {
        condition = "💨 Storm Gust Winds";
    } else if (windGust > 10 && windGust <= 14) {
        condition = "💨 Strong Gusty Winds";
    } else if (windSpeed > 10 && windSpeed <= 13) {
        condition = "💨 Very Windy";
    } else if (windGust > 7 && windGust <= 10) {
        condition = "💨 Gusty Winds";
    } else if (windSpeed > 7 && windSpeed <= 10) {
        condition = "💨 Windy";
    } else if (windGust > 5 && windGust <= 7) {
        condition = "💨 Mild Gust";
    } else if (windGust > 3 && windGust <= 5) {
        condition = "💨 Light Gust";
    } else if (windSpeed > 4 && windSpeed <= 7) {
        condition = "💨 Light Wind";
    } else if (windSpeed > 1 && windSpeed <= 4) {
        condition = "💨 Light Breeze";
    } else if (solarRadiation > 600 && uvIndex > 4) {
        condition = "😎 Bright Sun";
    } else if (solarRadiation > 205 && uvIndex > 0 && humidity > 70 && temperature > 75) {
        condition = "💦😎 Muggy";
    } else if (humidity > 69 && solarRadiation >= 119 && solarRadiation < 299) {
        condition = "🌤️ Partly Sunny";
    } else if (humidity > 69 && solarRadiation >= 79 && solarRadiation < 201) {
        condition = "🌤️ Hazy";
    } else if (humidity > 70 && solarRadiation >= 1 && solarRadiation < 79) {
        condition = "☁️ Overcast";
    } else if (solarRadiation > 135 && humidity < 80) {
        condition = "☀️ Sunny";
    } else if (solarRadiation > 0 && solarRadiation < 79 && currentHour >=18) {
        condition = "🌇 Twilight";
    } else if (solarRadiation <= 0 && (currentHour >= 16 || currentHour < 7)) {
        condition = "🌃 Night";    
    } else {
        condition = "😌 Calm";
    }

    const temperatureDescriptor = getTemperatureDescriptor(temperature);
    console.log("Temperature Descriptor: ", temperatureDescriptor); // Log temperature descriptor
    return `${condition} & ${temperatureDescriptor}`;
}

function getTemperatureDescriptor(temp) {
    if (temp < 15) return "Extreme Cold";
    if (temp >= 15 && temp < 25) return "Bitter Cold";
    if (temp >= 25 && temp < 34) return "Freezing";
    if (temp >= 34 && temp < 55) return "Cold";
    if (temp >= 55 && temp < 65) return "Cool";
    if (temp >= 65 && temp < 75) return "Mild";
    if (temp >= 75 && temp < 82) return "Warm";
    if (temp >= 82 && temp < 90) return "Hot";
    if (temp >= 90 && temp < 96) return "Very Hot";
    if (temp >= 96) return "Extreme Heat";

    return "Unknown";
}


document.addEventListener("DOMContentLoaded", () => {
    fetchWeatherData(); // Fetch current weather data immediately
    fetch3DayForecast(); // Fetch 3-day forecast data immediately

    // Update current weather every minute
    setInterval(() => {
        fetchWeatherData();
    }, 60000); // 60,000 milliseconds (1 minute)

    // Update forecast every 10 minutes
    setInterval(() => {
        fetch3DayForecast();
    }, 600000); // 600,000 milliseconds (10 minutes)
});

