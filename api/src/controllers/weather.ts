import http from "../http"

const { OPEN_WEATHER_API_TOKEN } = process.env

export const getWeather = async (lat: string, lon: string) => {
  return http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_TOKEN}`).then(res => res.data)
}