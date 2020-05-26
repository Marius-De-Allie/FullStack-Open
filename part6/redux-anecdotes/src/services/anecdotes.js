import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data
};

const createNew = async (anec) => {
    const object = {...anec, id: getId()};
    const response = await axios.post(baseUrl, object);
    return response.data
};

const update = async (id, item) => {
    const response = await axios.put(`${baseUrl}/${id}`, item);
    return response.data;
}

export default { getAll, createNew, update };