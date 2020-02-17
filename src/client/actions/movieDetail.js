import axios from 'axios';
import config from '../../../config';

export const FETCH_MOVIE_DETAIL = 'FETCH_MOVIE_DETAIL';

export const fetchMovieDetail = id => async dispatch => {
    let url;
    if (id) {
        url = `${config.api.baseUrl}/${id}?api_key=${config.api.key}`;
    } else {
        throw Error();
    }

    const res = await axios.get(url);

    dispatch({
        type: FETCH_MOVIE_DETAIL,
        payload: res.data
    });
};
