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
    switch (true) {

        // Thunderstorm
        case (weatherId >= 200 && weatherId <= 232):
            return "⛈️";

        // Drizzle
        case (weatherId >= 300 && weatherId <= 321):
            return "🌦️";

        // Light & Moderate Rain
        case (weatherId >= 500 && weatherId <= 504):
            return "🌧️";

        // Heavy Rain
        case (weatherId >= 520 && weatherId <= 531):
            return "🌧️💦";

        // Snow
        case (weatherId >= 600 && weatherId <= 622):
            return "🌨️";

        // Mist
        case (weatherId === 701):
            return "🌫️";

        // Smoke
        case (weatherId === 711):
            return "💨";

        // Haze
        case (weatherId === 721):
            return "🌁";

        // Dust
        case (weatherId === 731 || weatherId === 761):
            return "🌪️";

        // Fog
        case (weatherId === 741):
            return "🌁";

        // Sand
        case (weatherId === 751):
            return "🏜️";

        // Ash
        case (weatherId === 762):
            return "🌋";

        // Squall
        case (weatherId === 771):
            return "💨";

        // Tornado
        case (weatherId === 781):
            return "🌪️";

        // Clear
        case (weatherId === 800):
            return "☀️";

        // Few Clouds
        case (weatherId === 801):
            return "🌤️";

        // Scattered Clouds
        case (weatherId === 802):
            return "⛅";

        // Broken Clouds
        case (weatherId === 803):
            return "🌥️";

        // Overcast Clouds
        case (weatherId === 804):
            return "☁️";

        default:
            return "❓";
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
