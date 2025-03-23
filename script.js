let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector('.weather_search');

const getcountryName = (code) =>{
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
};
const getDateTime = (dt) =>{
    const curDate = new Date(dt * 1000);
    console.log(curDate);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
    
      const formatter = new Intl.DateTimeFormat("en-US", options);
      console.log(formatter);
      return formatter.format(curDate);
};

let city = "Palanpur";

citySearch.addEventListener("submit", (e) =>{
    e.preventDefault();

let cityName = document.querySelector('.city_name');
console.log(cityName.value);
city = cityName.value;
getweatherData();
cityName.value = "";

});


const getweatherData = async() => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=7b3419c64d656db0f4a63fb552bd554c`;
    try{
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);

        const { main, name, weather, wind, sys, dt } = data;
        cityName.innerHTML = `${name},${getcountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);

        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

        w_temperature.innerHTML = `${main.temp}&#176`;
        w_minTem.innerHTML = ` MIN: ${main.temp_min.toFixed()}&#176`;
        w_maxTem.innerHTML = ` MAX: ${main.temp_max.toFixed()}&#176`;

        w_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hPa`;

    }catch (error) {
        console.log(error);
        
    }
};

document.body.addEventListener("load",getweatherData());