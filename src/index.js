import "./styles.css";

const dom = {};

const cacheDomElements = (() => {
    dom.weatherForm = document.getElementById('weather-form');
    dom.tempDisplay = document.getElementById('temp');
})();

dom.weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const location = document.getElementById('location-input').value.trim();
    const unit = document.getElementById('unit').value;

    if (location === '') {
        alert('Please enter a location');
        return;
    }

    const data = await getWeatherData(location, unit);
    if (data) {
        dom.tempDisplay.textContent = data.temp + '°';
    }
});

async function getWeatherData (location, unit) {
    const apiKey = '8TZ85U7XYQW26HBA9SJCEBTZV';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?key=${apiKey}&unitGroup=${unit}&contentType=json`

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `API request failed with ${response.status}`);
        }

        const weatherData = await response.json();
        console.log(weatherData);

        // Objects with data needed
        const currentConditions = weatherData.currentConditions;
        const todaysConditions = weatherData.days[0];
        
        return {
            temp: currentConditions.temp,
            conditions: currentConditions.conditions,
            feelsLike: currentConditions.feelslike,
            humidity: currentConditions.humidity,
            uvIndex: currentConditions.uvindex,
            visibilty: currentConditions.visibility,
            maxTemp: todaysConditions.tempmax,
            minTemp: todaysConditions.tempmin,
            conditionForecast: todaysConditions.description,
            address: weatherData.resolvedAddress,
            dateTime: currentConditions.datetime
        };
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        alert(`Could nmot retrieve weather data: ${error.message}`);
        return null
    }
}

// getWeatherData('london', 'metric');
