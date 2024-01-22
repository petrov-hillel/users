import axios from 'axios';

const MAIN_API = 'https://jsonplaceholder.typicode.com/';

const api = axios.create({
    baseURL: MAIN_API,
});

export const getAllUsers = async () => {
    const { data } = await api.get('users')
    return data
}

export const getUserData = async (id: string | undefined) => {
    const { data } = await api.get(`users/${id}`)
    return data
}

export const getUserPosts = async (id: string | undefined) => {
    const { data } = await api.get(`users/${id}/posts`)
    return data
}