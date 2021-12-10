import { http } from './config'


export default {

    getBreeds: () => {
        return http.get('breeds')
    },
    getImages: (query_params) => {
        return http.get('images/search', { params: query_params})
    },

   
}