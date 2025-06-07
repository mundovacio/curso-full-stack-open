import { useEffect, useState } from "react"
import weatherService from "../services/weatherService"

function Country({ data }) {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    weatherService.get(...data.capitalInfo.latlng).then(setWeather)
  }, [data.capitalInfo.latlng])
  
  return (
    <>
      <h2>{data.name.common}</h2>
      <p>Capital: {data.capital[0]}</p>
      <p>Area: {data.area}</p>

      <h3>Languages</h3>
      <ul>
        {Object.values(data.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>

      <img src={data.flags.png} alt={data.flags.alt} />

      {weather &&
        <section>
          <h3>Wheather in {data.capital[0]} - <em>{weather.name}</em></h3>
          {weather.temperature && <p>Temperature {weather.temperature} Celsius</p>}
          {weather.icon && <img src={weather.icon.src} alt={weather.icon.alt} />}
          {weather.wind && <p>Wind {weather.wind} m/s</p>}
        </section>
      }

    </>
  )
}

export default Country