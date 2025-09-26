import "./styles.css";

async function getWeatherData (location, unit) {
    const apiKey = '8TZ85U7XYQW26HBA9SJCEBTZV';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?key=${apiKey}&unitGroup=${unit}&contentType=json`

    const response = await fetch(url);
    const weatherData = await response.json();

    console.log(weatherData);

    // Objects with data needed
    const currentConditions = weatherData.currentConditions;
    // Retrieving important data
    const temp = currentConditions.temp;
    const conditions = currentConditions.conditions;
    const humidity = currentConditions.humidity;

    console.log(temp, conditions, humidity);
}


const weatherData = getWeatherData(`singapore`, `metric`);