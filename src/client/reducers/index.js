import { combineReducers } from 'redux';
import moviesList from './moviesList';
import movieDetail from './movieDetail';
import headerInfo from './headerInfo';
import favouriteMovies from './markFav';

export default combineReducers({
    movies: moviesList,
    movie: movieDetail,
    headerInfo,
    favouriteMovies
});
