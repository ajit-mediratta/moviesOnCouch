import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { fetchMovieDetail } from '../../actions/movieDetail';
import { storeHeaderInfo } from '../../actions/headerInfo';
import config from '../../../../config';
import css from './Detail.scss';

const preFetchData = (store, params) => {
    return store.dispatch(fetchMovieDetail(params.split('/details/')[1]));
};

class Detail extends React.Component {
    static propTypes = {
        movie: PropTypes.object,
        fetchMovieDetail: PropTypes.func,
        storeHeaderInfo: PropTypes.func
    };

    static defaultProps = {
        movie: {},
        fetchMovieDetail: null,
        storeHeaderInfo: null
    }

    constructor(props) {
        super(props);
        this.imageSize = config.images.resolutions.medium;
    }

    componentDidMount() {
        this.props.fetchMovieDetail(this.props.match.params.id);
        this.storeHeaderInfo();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id != prevProps.match.params.id) {
            this.props.fetchMovies(this.props.match.params.id);
        }
    }

    storeHeaderInfo() {
        this.props.storeHeaderInfo({
            backLink: true,
            title: 'Movie Detail',
            goBack: this.props.history.goBack
        });
    }

    renderDetails() {
        let returnObj = '';
        const { movie } = this.props;
        const releaseDate = new Date(movie.release_date);

        if (movie.id) {
            return (
                <div className={ css.contentSection }>
                    <div className={ `${ css.titleSection } ${ css.section }` }>
                        <label>{movie.title}</label>
                    </div>
                    <div className={ css.detailCard }>
                        <div className={ css.section }>
                            <div className={ css.leftCardSection }>
                                <div className={ css.imageWrapper }>
                                    <div className={ css.imageContainer }>
                                        <img alt={movie.title} src={`${config.images.baseUrl}${this.imageSize}/${movie.poster_path}`} className={ css.itemImage } />
                                    </div>
                                </div>

                            </div>
                            <div className={ css.rightCardSection }>
                                <div className={ css.heading1 }>{releaseDate.getFullYear()}</div>
                                <div className={ css.heading2 }>{movie.runtime} min</div>
                                <div className={ css.heading4 }>{movie.vote_average}/10</div>
                                <div className={ `${ css.primaryBtn } ${ css.btnMarkFav }` }>Mark as favorite</div>
                            </div>
                            <div className={ css.clear }></div>
                        </div>
                        <div className={ `${ css.content } ${ css.section }` }>{movie.overview}</div>
                        <div className={ css.dividor }></div>
                        <div className={ `${ css.heading3 } ${ css.section }` }>Trailer:</div>
                        <div className={ `${ css.trailerSection } ${ css.section }` }>
                            <a href={ `https://www.imdb.com/title/${movie.imdb_id}/?ref_=nv_sr_srsg_0` } target="_blank" className={ css.trailerLink }>
                                <label className={ css.trailerIcon }><i className="fas fa-play"></i></label>
                                <label className={ `${ css.trailerTitle } ${ css.content }` }>Trailer 1</label>
                            </a>
                        </div>
                    </div>
                </div>
            );
        }
        return returnObj;
    }

    renderHead() {
        const { movie } = this.props;

        return (
            <Helmet key={Math.random()}>
                <title>{ `Movies On Couch - ${movie.title}` }</title>
                <meta property="og:title" content={ `Movies On Couch - ${movie.title}` } />
                <meta
                    name="description"
                    content="Movies On Couch project is a React based project powered by - THE MOVIES DB"
                />
                <meta name="robots" content="index, follow" />
            </Helmet>
        );
    }

    render() {
        if (this.props.match.path !== '/details/:id') {
            return <Redirect to='movies/popular' />;
        }

        return (
            <div>
                {this.renderHead()}
                {this.renderDetails()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        movie: state.movie
    };
};

const mapDispachToProps = dispatch => {
    return {
        fetchMovieDetail: id => dispatch(fetchMovieDetail(id)),
        storeHeaderInfo: info => dispatch(storeHeaderInfo(info))
    };
};

export default {
    component: connect(mapStateToProps, mapDispachToProps)(Detail),
    preFetchData
};
