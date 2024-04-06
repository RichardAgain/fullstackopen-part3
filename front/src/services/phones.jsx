
import axios from "axios";
const url = '/api/persons'

const getAll = () => 
    axios.get(url)
    .then(response => response.data)

const create = newPerson => 
    axios.post(url, newPerson)
    .then(response => response.data)

const update = (newPerson) =>
    axios.put(`${url}/${newPerson.id}`, newPerson)
    .then(response => response.data)

const remove = id =>
    axios.delete(`${url}/${id}`)
    .then(response => response.data)



export default { getAll, create, update, remove }