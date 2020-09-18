import update from 'immutability-helper';
import axios from 'axios'

const baseURL = "/api/v1/todos"

/**
 * Get the list of todo items.
 * @return {Array}
 */

export const getAll = async () => {
    const res = await axios.get(baseURL)
    return res.data.map((todo, index) => ({
        id: index + 1,
        text: todo.text,
        completed: todo.completed,
        _id: todo._id
    }))
}

export const getItemById = (itemId) => {
    return getAll().find(item => item.id === itemId);
}

export const updateStatus = async (id, data) => {
    const res = await axios.patch(`${baseURL}/${id}`, data)
    return res.data
}

/**
 * A counter to generate a unique id for a todo item.
 * Can remove this logic when the todo is created using backend/database logic.
 * @type {Number}
 */
let todoCounter = 1;

function getNextId() {
    return getAll().length + todoCounter++;
}

/**
 * Adds a new item on the list and returns the new updated list (immutable).
 *
 * @param {Array} list
 * @param {Object} data
 * @return {Array}
 */
export const addToList = async (data, list) => {
    const res = await axios.post(baseURL, { text: data })
    return {
        id: list.length + 1,
        text: res.data.text,
        completed: res.data.completed,
        _id: res.data._id,
    }
}
