import axios from "axios"
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const iconUrl = 'https://openweathermap.org/img/wn/'
const apiKey = process.env.REACT_APP_API_KEY

const getWeather = (capital) => {
    const request = axios.get(`${baseUrl}${capital}&appid=${apiKey}`)
    return request.then(res => res.data)
}

const getWeatherIcon = (icon) => {
    const request = axios.get(`${iconUrl}${icon}@2x.png`)
    return request.then(res => res.data)
}

const weatherservice = { getWeather, getWeatherIcon }

export default weatherservice