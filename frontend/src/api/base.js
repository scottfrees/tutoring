import axios from 'axios'
axios.defaults.withCredentials = true;
export default () => {
    return axios.create({
        baseURL: process.env.VUE_APP_API_URL,

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
}