import axios from "axios"
const baseURL = 'https://restcountries.com/v3.1/name'

const getCountries = (searchCountry) => {
    const request = axios.get(`${baseURL}/${searchCountry}`)
    return request.then(res => res.data)
}

const countriesServices = { getCountries }

export default countriesServices