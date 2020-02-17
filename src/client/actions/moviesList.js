import axios from 'axios';
import config from '../../../config';

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const LOAD_MORE_MOVIES = 'LOAD_MORE_MOVIES';

export const fetchMovies = (type, page) => async dispatch => {
    let url;
    if (type) {
        url = `${config.api.baseUrl}/${type}?api_key=${config.api.key}&page=${page}`;
    } else {
        url = `${config.api.baseUrl}/popular?api_key=${config.api.key}&page=${page}`;
    }

    const res = await axios.get(url);

    if (page === 1) {
        dispatch({
            type: FETCH_MOVIES,
            payload: res.data
        });
    }
    else {
        dispatch({
            type: LOAD_MORE_MOVIES,
            payload: res.data
        });
    }

};
