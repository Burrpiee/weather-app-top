import "./styles.css";

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
    const feelsLike = currentConditions.feelslike;
    const conditions = currentConditions.conditions;
    const humidity = currentConditions.humidity;
    const maxTemp = todaysConditions.tempmax;
    const minTemp = todaysConditions.tempmin;
    const dailyConditions = todaysConditions.description;
    
    return {
        temp,
        feelsLike,
        conditions,
        humidity,
        maxTemp,
        minTemp,
        dailyConditions
    }
}
