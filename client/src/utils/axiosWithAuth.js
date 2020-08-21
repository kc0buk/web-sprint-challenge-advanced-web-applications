import axios from 'axios'

export const API_BASE_URL = 'http://localhost:5000'

export const axiosWithAuth = () => {
    return axios.create({
        baseURL: API_BASE_URL,
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}