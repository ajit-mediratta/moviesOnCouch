import React from 'react';
import css from './Footer.scss';

export default () => {
    return (
        <footer className={ css.footerBar }>
            <div className={ css.content }>
                <span>POWERED BY - THE MOVIE DB</span>
                <a className={ css.sourceLink } href="https://github.com/ajit-mediratta/moviesOnCouch.git">
                    Source Code
                </a>
            </div>
        </footer>
    );
};
