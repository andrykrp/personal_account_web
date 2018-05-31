import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './ArrowButton.pcss';

export default class ArrowButton extends PureComponent {
    static propTypes = {
        label: PropTypes.string,
        onClick: PropTypes.func
    };

    render() {
        const { label, onClick } = this.props;

        return (

            <div className={styles.wrapper} onClick={onClick}>
                <span className={styles.label} dangerouslySetInnerHTML={{ __html: label }} />
                <img src='/img/arrow_right.svg' className={styles.iconArrow} />
            </div>

        );
    }
}