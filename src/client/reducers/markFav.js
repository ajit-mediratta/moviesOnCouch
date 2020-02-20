import { MARK_AS_FAVOURITE } from '../actions/markFav';

const hashFavouriteMovies = (id, state) => {
    const favouriteMovies = { ...state };
    favouriteMovies[id] = typeof state[id] !== "undefined" ? !favouriteMovies[id] : true;
    return { ...state, ...favouriteMovies }
}

export default (state = {}, action) => {
    switch (action.type) {
        case MARK_AS_FAVOURITE:
            return hashFavouriteMovies(action.payload, state)

        default:
            return state;
    }
};
