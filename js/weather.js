const weatherContainer = dGetId('weather-container');
const weatherLoadingContainer = dGetId('weather-loading');
const weatherDate = dGetId('weather-date');
const weatherCity = dGetId('weather-city');
const weatherIcon = dGetId('weather-icon');
const weatherTemperature = dGetId('temperature');
const weatherCelsius = dGetId('celsius');
const weatherFahrenhit = dGetId('Fahrenheit');
const weatherFeelLike = dGetId('weather-feel-like');
const weatherHumidity = dGetId('humidity');
const weatherWind = dGetId('wind');
const weatherVisibility = dGetId('visibility');
const weatherDescription = dGetId('weather-description');

const CELSIUS = '&#8451;';
const FAHRENHEIT = '&#8457;';

const key = 'c91aaf9d92dcf8cae82467d5b31bf652';
const api = (lat, lon, key) =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=kr`;

async function onGeoOk(position) {
    weatherContainer.classList.remove(HIDDEN_CLASS);
    weatherLoadingContainer.classList.add(HIDDEN_CLASS);
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const response = await fetch(api(lat, lon, key));
    const data = await response.json();
    setWeatherElement(data);
}
function onGeoError() {
    console.error('not allowed location infomation');
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
function getDirection(degree) {
    if (degree < 45) {
        return 'N';
    } else if (degree < 90) {
        return 'NW';
    } else if (degree < 135) {
        return 'W';
    } else if (degree < 180) {
        return 'SW';
    } else if (degree < 225) {
        return 'S';
    } else if (degree < 270) {
        return 'SE';
    } else if (degree < 315) {
        return 'E';
    } else if (degree < 360) {
        return 'NE';
    }
}

function setWeatherElement(data) {
    setWeatherIcon(data.weather[0]);
    setWindElements(data.wind);
    setHumidity(data.main);
    setVisibility(data);
    setFeelLike(data.main, CELSIUS);
    setWeatherDescription(data.weather[0]);
    setWeatherTemperature(data.main.temp);
    setWeatherCity(data);
    setWeatherDate();

    function handleTemperature(data, type) {
        return (e) => {
            e.preventDefault();
            if (type === CELSIUS && weatherCelsius.classList.length) {
                return;
            }
            if (type === FAHRENHEIT && weatherFahrenhit.classList.length) {
                return;
            }
            toggleClass(weatherCelsius, 'active');
            toggleClass(weatherFahrenhit, 'active');
            const toFahrenheit = (n) => (n * 1.8 + 32).toFixed(2);

            if (weatherCelsius.classList.length) {
                setFeelLike(data.main, CELSIUS);
                setWeatherTemperature(data.main.temp);
            } else {
                setFeelLike(
                    {
                        feels_like: toFahrenheit(data.main.feels_like),
                    },
                    FAHRENHEIT,
                );
                setWeatherTemperature(toFahrenheit(data.main.temp));
            }
        };
    }
    addEvent(weatherCelsius, 'click', handleTemperature(data, CELSIUS));
    addEvent(weatherFahrenhit, 'click', handleTemperature(data, FAHRENHEIT));
}
function setWindElements({ speed, deg }) {
    const windIcon = createIcon('fa-regular', 'fa-location-arrow');
    const windDescription = ce('span');
    windDescription.innerText = `Wind:${speed}m/s ${getDirection(deg)}`;
    windIcon.style.transform = `rotate(${-45 + deg}deg)`;
    appendChild(weatherWind, [windIcon, windDescription]);
}
function setHumidity({ humidity }) {
    weatherHumidity.innerText = `Humidity: ${humidity}%`;
}
function setVisibility({ visibility }) {
    weatherVisibility.innerText = `Visibility: ${parseInt(
        visibility / 1000,
    )}km`;
}
function setFeelLike({ feels_like }, type) {
    weatherFeelLike.innerHTML = `Feels like ${feels_like}${type}`;
}
function setWeatherDescription({ main }) {
    weatherDescription.innerText = main;
}
function setWeatherTemperature(temp) {
    weatherTemperature.innerText = temp;
}
function setWeatherIcon({ icon, main }) {
    weatherIcon.src = `http://openweathermap.org/img/wn/${icon}.png`;
    weatherIcon.alt = `${main} icon`;
}
function setWeatherDate() {
    const searchTime = new Date();
    const month = searchTime.getMonth() + 1;
    const day = searchTime.getDay();
    const hh = searchTime.getHours().toString().padStart(2, '0');
    const mm = searchTime.getMinutes().toString().padStart(2, '0');
    weatherDate.innerText = `${month}. ${day}. ${hh}:${mm}`;
}
function setWeatherCity({ name, sys: { country } }) {
    weatherCity.innerText = `${name}, ${country}`;
}
