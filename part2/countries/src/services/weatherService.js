
import axios from 'axios'
const api_key = import.meta.env.VITE_API_KEY_OPENWHEATHER
const baseURL = 'https://api.openweathermap.org/data/2.5/weather'

const get = ( lon, lan) => {
    return axios.get(`${baseURL}?lat=${lon}&lon=${lan}&appid=${api_key}&units=metric`)
        .then(({data}) => {
            return {
                name: data.name,
                temperature: data.main.temp,
                wind: data.wind.speed,
                icon: {
                    src:`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                    alt: data.weather[0].description
                }
            }
        })
}

export default {
    get
}