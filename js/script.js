const API_KEY = '6647c08298b1d619fb3d0b6cc3f90056'

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}

const fetchData = position => {

    const { latitude, longitude } = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data));
}



const setWeatherData = data => {

    console.log(data)

    const weatherData = {
    location: data.name,
    description: data.weather[0].main,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    temp: data.main.temp, 
    wind: data.wind.speed,
    date: getDate(),

    
}

Object.keys(weatherData).forEach(key => {
    document.getElementById(key).textContent = weatherData[key];
})

cleanUp();

}

const cleanUp = () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display = 'none';
    container.style.display = 'flex';
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}
