import { http } from './config'


export default {

    getBreeds: () => {
        return http.get('breeds')
    },
    getImages: (query_params) => {
        return http.get('images/search', { params: query_params})
    },
    postVote: (body) => {
        return http.post('votes', body)
    },
    getVotes: (query_params) => {
        return http.get('votes', { params: query_params})
    },

   
}