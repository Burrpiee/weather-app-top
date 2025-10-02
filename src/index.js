import "./styles.css";

const dom = {};

const cacheDomElements = (() => {
    dom.weatherForm = document.getElementById('weather-form');
    dom.addressDisplay = document.getElementById('address');
    dom.tempDisplay = document.getElementById('temp');
    dom.conditionsDisplay = document.getElementById('conditions');
    dom.conditionForecastDisplay = document.getElementById('condition-forecast');
    dom.feelsLikeTempDisplay = document.getElementById('feels-like-temp');
    dom.humidityDisplay = document.getElementById('humidity');
    dom.minTempDisplay = document.getElementById('min-temp');
    dom.maxTempDisplay = document.getElementById('max-temp');
    dom.uvIndexDisplay = document.getElementById('uv-index');
    dom.visibilityDisplay = document.getElementById('visibility');
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
        dom.addressDisplay.textContent = data.address;
        dom.tempDisplay.textContent = data.temp + '°';
        dom.conditionsDisplay.textContent = data.conditions;
        dom.conditionForecastDisplay.textContent = data.conditionForecast;
        dom.feelsLikeTempDisplay.textContent = data.feelsLike + '°';
        dom.humidityDisplay.textContent = data.humidity + '%';
        dom.minTempDisplay.textContent = data.minTemp + '°';
        dom.maxTempDisplay.textContent = data.maxTemp + '°';
        dom.uvIndexDisplay.textContent = data.uvIndex;
        dom.visibilityDisplay.textContent = data.visibility;
        
        //Background rendering
        const hourString = data.dateTime.substring(0, 2);
        const hour = parseInt(hourString);
        const backgroundBaseName = getBackGroundPath(hour, data.icon);
        
        try {
            //Dynamic import
            const imageModule = await import (
                /* webpackInclude: /\.jpg$/ */
                `./images/backgrounds/${backgroundBaseName}.jpg`
            );
            console.log(imageModule);
            document.body.style.backgroundImage = `url(${imageModule.default})`;

        } catch (error) {
            console.error(`Error loading background image for ${backgroundBaseName}.jpg:`, error);
            document.body.style.backgroundImage = `url(images/backgrounds/default-fallback.jpg)`;
        }
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
            visibility: currentConditions.visibility,
            maxTemp: todaysConditions.tempmax,
            minTemp: todaysConditions.tempmin,
            conditionForecast: todaysConditions.description,
            address: weatherData.resolvedAddress,
            dateTime: currentConditions.datetime,
            icon: currentConditions.icon
        };

    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        alert(`Could nmot retrieve weather data: ${error.message}`);
        return null
    }
};

function getBackGroundPath (hour, icon) {
    let timePrefix = ''
    let weatherSuffix = 'clear';

    if (hour >= 6 && hour <= 18) { //Daytime
        timePrefix = 'day';
    } else { //nighttime
        timePrefix = 'night';
    }

    switch (icon) {
        case 'snow':
            weatherSuffix = 'snow';
            break;
        case 'rain':
            weatherSuffix = 'rain';
            break;
        case 'foggy':
            weatherSuffix = 'fog';
            break;
        case 'cloudy':
        case 'partly-cloudy-day':
        case 'partly-cloudy-night':
            weatherSuffix = 'cloudy';
            break;
        case 'wind':
        case 'clear-day':
        case 'clear-night':
            weatherSuffix = 'clear';
            break;
        default:
            weatherSuffix = 'clear';
            break;
    }
    
    return `${timePrefix}-${weatherSuffix}`;
};

// getWeatherData('london', 'metric');
