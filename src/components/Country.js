export const Country = ({ fetchedCountries, showSelectedCountry, weather, weatherIcon }) => {
    if (fetchedCountries === undefined) {

    } else if (fetchedCountries.length >= 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (fetchedCountries.length <= 10 && fetchedCountries.length >= 2) {
        return (
            <ul>
                {fetchedCountries.map((data, index) => {
                    return (
                        <li key={index}>
                            {data.name.common}
                            <button onClick={() => showSelectedCountry(data.name.common)}>show</button>
                        </li>
                    )
                })}
            </ul>
        )
    } else if (fetchedCountries.length === 1) {
        return (
            <>
                {fetchedCountries.map((data, index) => {
                    return (
                        <div key={index}>
                            <div>
                                <p>Common: <strong>{data.name.common}</strong></p>
                                <p>Offical: <strong>{data.name.common}</strong></p>
                            </div>
                            <div>
                                <p>Capital: <strong>{data.capital}</strong></p>
                                <p>Area: <strong>{data.area}</strong></p>
                            </div>
                            <p>Languages</p>
                            <ul>
                                {Object.entries(data.languages).map((language, index) => {
                                    return <li key={index}>{language}</li>
                                })}
                            </ul>
                            <img src={data.flags.svg} height={200} width={200} alt={`flag of ${data.name.common}`} />
                            <h3>Weather in {data.capital}</h3>
                        </div>
                    )
                })}
                {weather && 
                        <div>
                            <p>Capital: <strong>{((weather.main.temp - 32)* 5/9).toFixed(4)} Celcius</strong></p>
                            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} height={40} width={40} alt="weather icon" />
                            <p>Wind: <strong>{weather.wind.speed} m/s</strong></p>
                        </div>
                }
            </>
        )
    }
}