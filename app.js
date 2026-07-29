const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "a4e524c611096e9b87e72ea7f2f06992";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getweatherData(city);
            displayweatherInfo(weatherData);
        }
        catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter a city.");
    }
});

async function getweatherData(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiurl);
    console.log(response);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function displayweatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    const descDisplay= document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(2)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    weatherEmoji.textContent = getweatherEmoji(id);
    descDisplay.textContent = description;


    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    descDisplay.classList.add("descDisplay");



    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(weatherEmoji);
    card.appendChild(descDisplay);

}

function getweatherEmoji(weatherId) {
    switch(true) {
        case(weatherId >= 200 && weatherId < 300):
        return "🌩";
        case(weatherId >= 300 && weatherId < 400):
        return "🌧";
        case(weatherId >= 400 && weatherId < 500):
        return "☔";
        case(weatherId >= 500 && weatherId < 600):
        return "❄";
        case(weatherId >= 700 && weatherId < 800):
        return "🌫";
        case(weatherId === 800):
        return "🌞";
        case(weatherId >= 801 && weatherId < 810):
        return "☁";
        default: 
        return "❓"
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}