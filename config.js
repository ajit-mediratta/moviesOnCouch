const config = {
    api: {
        key: '',
        baseUrl: 'http://api.themoviedb.org/3/movie',
    },
    images: {
        baseUrl: 'http://image.tmdb.org/t/p/',
        resolutions: {
            x_small: 'w92',
            small: 'w154',
            medium: 'w185',
            large: 'w342',
            x_large: 'w500',
            xx_large: 'w780'
        }
    },
    movieType: {
        popular: 'Popular',
        now_playing: 'Now Playing',
        top_rated: 'Top Rated',
        upcoming: 'Upcoming'
    }
};
export default config;
