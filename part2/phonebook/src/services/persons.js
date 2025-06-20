import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
    const promise = axios.get(baseUrl)
    return promise.then(response => response.data)
}

const create = (newPerson) => {
    const promise = axios.post(baseUrl, newPerson)
    return promise.then(response => response.data)
}

const update = (id, updatedPerson) => {
    const promise = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return promise.then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove}