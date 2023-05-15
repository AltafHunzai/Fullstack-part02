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

const updatePerson = (name, newObject) => {
    const request = axios.put(`${baseUrl}/${name}`, newObject)
    return request.then(res => res.data)
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(res => res.data)
}

const contactService = { getallPersons, addPerson, updatePerson, deleteContact }

export default contactService;