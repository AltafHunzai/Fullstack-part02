export const Country = ({ fetchedCountries }) => {
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
                        <li key={index}>{data.name.common}</li>
                    )
                })}
            </ul>
        )
    } else if (fetchedCountries.length === 1) {
        console.log(fetchedCountries);
        return (
            fetchedCountries.map((data, index) => {
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
                    </div>
                )
            })
        )
    }
}