import { FETCH_MOVIES, LOAD_MORE_MOVIES } from '../actions/moviesList';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_MOVIES:
            return action.payload;
        case LOAD_MORE_MOVIES:
            let results = [];
            let page = 1;

            if (state.results && action.payload.results) {
                results = [...state.results, ...action.payload.results];
                page = action.payload.page;
            }
            return {
                ...state,
                results,
                page
            };
        default:
        return state;
    }
};
