import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import css from './Header.scss';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

class Header extends React.Component {
    static propTypes = {
        headerInfo: PropTypes.object
    };

    static defaultProps = {
        headerInfo: {
            backLink: false,
            title: '',
            goBack: () => {}
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false
        };
    }

    toggleMenu = () => {
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    }

    backButtonHandler = () => {
        this.props.headerInfo.goBack();
    }

    getTabList(bindToggleEvent = true) {
        return (
            <React.Fragment>
                <li><Link to="/movies/popular" className={ css.menuItem } onClick={bindToggleEvent ? this.toggleMenu : null}>Popular</Link></li>
                <li><Link to="/movies/now_playing" className={ css.menuItem } onClick={bindToggleEvent ? this.toggleMenu : null}>Now Playing</Link></li>
                <li><Link to="/movies/top_rated" className={ css.menuItem } onClick={bindToggleEvent ? this.toggleMenu : null}>Top Rated</Link></li>
                <li><Link to="/movies/upcoming" className={ css.menuItem } onClick={bindToggleEvent ? this.toggleMenu : null}>Upcoming</Link></li>
            </React.Fragment>
        )
    }

    render() {
        return (
            <div>
                <nav className={ css.navBar }>
                    <div className={ css.navBarContent }>
                        { this.props.headerInfo.backLink && <div className={ css.navBackWrapper } onClick={ this.backButtonHandler }>
                            <div className={ css.navBackIcon }>
                                <i className="fas fa-arrow-left"></i>
                            </div>
                            <label className={ `${css.navLabel} ${ css.navLabelWithBack }` } >{ this.props.headerInfo.title }</label>
                        </div> }
                        { !this.props.headerInfo.backLink && <label className={ css.navLabel }>{ this.props.headerInfo.title }</label> }

                        <a onClick={this.toggleMenu} className={ css.navMenuIcon }>
                            <i className="fas fa-ellipsis-v"></i>
                        </a>
                        <ul className={ css.onNavMenu }>
                            { this.getTabList(false) }
                        </ul>
                    </div>
                </nav>
                <div className={ `${ css.navSideOverlay } ${ this.state.menuOpen ? css.sideOverlayShow : css.sideOverlayHide }` } onClick={this.toggleMenu}/>
                <ul className={ `${ css.navSideMenu } ${ this.state.menuOpen ? css.sideMenuShow : css.sideMenuHide }` }>
                    <li><a className={ css.subheader }>Menu</a></li>
                    <li><div className={ css.divider } /></li>
                    <li><Link to="/" className={ css.menuItem } onClick={this.toggleMenu}>Home</Link></li>
                    { this.getTabList(true) }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        headerInfo: state.headerInfo
    };
};

export default connect(mapStateToProps, null)(Header);
