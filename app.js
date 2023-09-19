let apikey = "2f7c3ecb633a3292901af9c626ef4d87";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let inputbox = document.querySelector(".weather input");
let button = document.querySelector(".weather button");
let mainimage = document.querySelector(".main-image");
let getLocation = document.getElementById('get-location');

async function myweather(city) {
    try {
        let responce = await fetch(apiUrl + city + `&appid=${apikey}`);

        if (!responce.ok) {
            if (responce.status === 404) {
                throw new Error("City not found. Please Enter a Valid City Name.");
            } else {
                throw new Error(`Network response was not OK ${responce.status}`);
            }
        }

        let data = await responce.json();

        document.querySelector(".city-name").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".Wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clear") {
            mainimage.src = "images/clear.png";
        } else if (data.weather[0].main == "Clouds") {
            mainimage.src = "images/clouds.png";
        } else if (data.weather[0].main == "Drizzle") {
            mainimage.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            mainimage.src = "images/mist.png";
        } else if (data.weather[0].main == "Rain") {
            mainimage.src = "images/rain.png";
        } else if (data.weather[0].main == "Snow") {
            mainimage.src = "images/snow.png";
        } else if (data.weather[0].main == "Haze") {
            mainimage.src = "images/haze.png";
        }
        document.querySelector(".main").style.display = "none";
        document.querySelector(".inner").style.display = "block";
    } catch (error) {
        console.error("Error:", error.message);
        document.querySelector(".main").innerHTML = error.message;
        document.querySelector(".main").style.display = "block";
        document.querySelector(".inner").style.display = "none";
    }
}

button.addEventListener("click", function () {
    myweather(inputbox.value);
});

async function currentData(lat, lon) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apikey}`);
    return await promise.json();
}

async function getCurrentLocation(position) {
    const loc = await currentData(position.coords.latitude, position.coords.longitude);
    document.querySelector(".city-name").innerHTML = loc.name;
    document.querySelector(".temp").innerHTML = Math.round(loc.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = loc.main.humidity + "%";
    document.querySelector(".Wind").innerHTML = loc.wind.speed + "km/h";

    if (loc.weather[0].main == "Clear") {
        mainimage.src = "images/clear.png";
    } else if (loc.weather[0].main == "Clouds") {
        mainimage.src = "images/clouds.png";
    } else if (loc.weather[0].main == "Drizzle") {
        mainimage.src = "images/drizzle.png";
    } else if (loc.weather[0].main == "Mist") {
        mainimage.src = "images/mist.png";
    } else if (loc.weather[0].main == "Rain") {
        mainimage.src = "images/rain.png";
    } else if (loc.weather[0].main == "Snow") {
        mainimage.src = "images/snow.png";
    } else if (loc.weather[0].main == "Haze") {
        mainimage.src = "images/haze.png";
    }
}
function faileddata() {
    console.log('There is an Error While Getting Weather Data');
}
getLocation.addEventListener('click', async function cL() {
    navigator.geolocation.getCurrentPosition(getCurrentLocation, faileddata);
});
window.addEventListener('load', () => {
    navigator.geolocation.getCurrentPosition(getCurrentLocation, faileddata);
});