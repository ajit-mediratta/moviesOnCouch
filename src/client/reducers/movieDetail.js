import { FETCH_MOVIE_DETAIL } from '../actions/movieDetail';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_MOVIE_DETAIL:
            return action.payload;

        default:
            return state;
    }
};
