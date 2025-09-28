import "./styles.css";

const weatherForm = document.getElementById('weather-form');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = document.getElementById('location-input').value.trim();
    const unit = document.getElementById('unit').value;

    getWeatherData(location, unit);
});

async function getWeatherData (location, unit) {
    const apiKey = '8TZ85U7XYQW26HBA9SJCEBTZV';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?key=${apiKey}&unitGroup=${unit}&contentType=json`

    const response = await fetch(url);
    const weatherData = await response.json();

    console.log(weatherData);

    // Objects with data needed
    const currentConditions = weatherData.currentConditions;
    const todaysConditions = weatherData.days[0];

    //getting required data
    const temp = currentConditions.temp;
    const conditions = currentConditions.conditions;
    const feelsLike = currentConditions.feelslike;
    const humidity = currentConditions.humidity;
    const uvIndex = currentConditions.uvindex;
    const visibilty = currentConditions.visibility;
    const maxTemp = todaysConditions.tempmax;
    const minTemp = todaysConditions.tempmin;
    const conditionForecast = todaysConditions.description;
    const address = weatherData.resolvedAddress;
    const dateTime = currentConditions.datetime;
    
    return {
        temp,
        feelsLike,
        conditions,
        humidity,
        uvIndex,
        visibilty,
        maxTemp,
        minTemp,
        conditionForecast,
        address,
        dateTime
    }
}

getWeatherData('london', 'metric');
