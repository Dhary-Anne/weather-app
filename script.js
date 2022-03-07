const searchForm = document.querySelector('search-form');
const searchButton = document.querySelector('submit-button');
const error = document.querySelector('error.msg');

//handle API key and error handling 
async function getData(location){
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=a7ff76b92de774f6d574180419f69a35=${location}`,
        {mode: 'cors'}
    )
    if(response.status === 400){
        throwError();
    }else{
        error.display = 'none';
        const weatherData = await response.json();
        const receivedData = processData(weatherData);
        displayWeather(receivedData);
        reset();
    }
}

function throwError() {
    error.style.display = 'block';
    error.classList.add('slide-up')
}

//collect data needed to display 

function processData(weatherData){
    const data = {
        condition: weatherData.current.condition.text,
        feelsLike: {
            f: Math.round(weatherData.current.feelslike_f),
            c: Math.round(weatherData.current.feelslike_c),
        },
        currentTemperature: {
            f: Math.round(weatherData.current.temp_f),
            c: Math.round(weatherData.current.temp_c),
        },
        wind: Math.round(weatherData.current.wind_mph),
        humidity: weatherData.current.humidity,
        location: weatherData.location.name.toUpperCase(),
    };
    return data;
}

function showData(receivedData) {
    const weatherDetails = document.querySelector('weather-info');
    Array.from(weatherDetails).forEach((div) =>{
        if(!div.classList.contains('slide-up')){
            div.offsetWidth;
            div.classList.add('slide-up');
        }else{
            return
        }
    });
    
    //add logic for inputting received data
}

//obtain user location
function obtainUserInput() {
    const userInput = document.querySelector('input[type="text"]');
    const userLocationQuery = input.value;
    getData(userLocationQuery);
}
