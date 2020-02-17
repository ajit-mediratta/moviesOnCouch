import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import ErrorBoundary from './components/ErrorBoundry';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import css from './styles/App.scss';

class App extends React.Component {
    static propTypes = {
        route: PropTypes.objectOf(PropTypes.any),
        match: PropTypes.object
    };

    static defaultProps = {
        route: null,
        match: {}
    }

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header />
                <div className={ `${css.appContainer} container` }>
                    <ErrorBoundary>{renderRoutes(this.props.route.routes)}</ErrorBoundary>
                </div>
                <Footer />
            </div>
        );
    }
}

export default {
    component: App
};
