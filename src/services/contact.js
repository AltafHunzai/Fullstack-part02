import axios from "axios";
const baseUrl = 'http://localhost:3010/persons';

const getallPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const addPerson = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(res => res.data)
}

const updatePerson = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(res => res.data)
}

const contactService = { getallPersons, addPerson, updatePerson}

export default contactService;