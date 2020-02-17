import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { fetchMovies } from '../../actions/moviesList';
import { storeHeaderInfo } from '../../actions/headerInfo';
import config from '../../../../config';
import css from './Home.scss';

const preFetchData = (store, params) => {
    return store.dispatch(fetchMovies(params.split('/movies/')[1], 1));
};

class Home extends React.Component {
    static propTypes = {
        movies: PropTypes.object,
        match: PropTypes.object,
        headerInfo: PropTypes.object,
        fetchMovies: PropTypes.func,
        storeHeaderInfo: PropTypes.func
    };

    static defaultProps = {
        movies: {},
        match: {},
        headerInfo: {
            backLink: false,
            title: ''
        },
        fetchMovies: null,
        storeHeaderInfo: null
    }

    constructor(props) {
        super(props);

        this.state = {
            imageSize: config.images.resolutions.medium
        };

        this.imageSize = config.images.resolutions.medium;
        this.page = 1;
    }

    componentDidMount() {
        const { movies, match, fetchMovies } = this.props;

        if (Object.keys(movies).length === 0 || (movies.results && movies.results.length === 0)) {
            fetchMovies(match.params.type, this.page);
        }

        const windowWidth = window.innerWidth;

        if (windowWidth >= 1025) {
            this.setImageSize(config.images.resolutions.large);
        }

        this.storeHeaderInfo();
    }

    componentDidUpdate(prevProps) {
        const { match, fetchMovies } = this.props;

        if (match.params.type != prevProps.match.params.type) {
            this.page = 1;
            fetchMovies(match.params.type, this.page);
        }
        this.storeHeaderInfo();
    }

    setImageSize(imageSize) {
        this.setState({
            imageSize
        });
    }

    storeHeaderInfo() {
        const presentMovieType = `${config.movieType[this.props.match.params.type]} Movies`;

        if (presentMovieType && this.props.headerInfo.title !== presentMovieType) {
            this.props.storeHeaderInfo({
                backLink: false,
                title: presentMovieType
            });
        }
    }

    redirectToMovieDetail = id => () => {
        this.props.history.push(`/details/${id}`);
    }

    loadMoreMovies = () => {
        this.page++;
        this.props.fetchMovies(this.props.match.params.type, this.page);
    }

    renderMovies() {
        let returnObj = '';
        const { movies } = this.props;

        if (movies.results) {
            returnObj = movies.results.map(movie => (
                <div className={ css.imageWrapper } key={movie.id} onClick={ this.redirectToMovieDetail(movie.id) }>
                    <div className={ css.imageContainer }>
                        <img alt={movie.title} src={`${config.images.baseUrl}${this.state.imageSize}/${movie.poster_path}`} className={ css.itemImage } />
                    </div>
                </div>
            ));
        }
        return returnObj;
    }

    renderHead() {
        return (
            <Helmet key={Math.random()}>
                <title>Movies On Couch</title>
                <meta property="og:title" content="Movies On Couch" />
                <meta
                    name="description"
                    content="Movies On Couch project is a React based project powered by - THE MOVIES DB"
                />
                <meta name="robots" content="index, follow" />
            </Helmet>
        );
    }

    render() {
        const { match } = this.props;

        if (match.path === '/') {
            return <Redirect to='movies/popular' />;
        }

        return (
            <div>
                {this.renderHead()}
                <div className={ css.contentSection }>
                    <div className={ css.contentWrapper }>
                        {this.renderMovies()}
                    </div>
                    <div className={ css.loadMoreButton } onClick={ this.loadMoreMovies }>
                        <i className="fas fa-search-plus"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movies,
        headerInfo: state.headerInfo
    };
};

const mapDispachToProps = dispatch => {
    return {
        fetchMovies: (type, page) => dispatch(fetchMovies(type, page)),
        storeHeaderInfo: info => dispatch(storeHeaderInfo(info))
    };
};

export default {
    component: connect(mapStateToProps, mapDispachToProps)(Home),
    preFetchData
};
