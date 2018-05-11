import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './CommonLayout.pcss';

export default class CommonLayout extends PureComponent {
    static propTypes = {
        children: PropTypes.node
    };

    render() {
        const { children } = this.props;

        return (
            <div className={styles.wrapper}>
                <div>Базовый слой</div>
                <div>
                    <NavLink to='/'>Страница 1</NavLink>
                    <br />
                    <NavLink to='/2'>Страница 2</NavLink>
                </div>
                {children}
            </div>
        );
    }
}
