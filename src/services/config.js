
import axios from 'axios'

const http = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
})

http.interceptors.request.use((config) => {

    config.headers['x-api-key'] = "DEMO-API-KEY";

    return config;
}
);


export { http }