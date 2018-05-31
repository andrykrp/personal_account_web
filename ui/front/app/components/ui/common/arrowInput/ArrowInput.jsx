import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './ArrowInput.pcss';

export default class ArrowInput extends PureComponent {
    static propTypes = {
        label: PropTypes.string,
        onClick: PropTypes.func,
        grey: PropTypes.bool
    };

    static defaultProps = {
        grey: false
    };

    render() {
        const { label, onClick, grey } = this.props;

        return (
            <div className={styles.wrapper} onClick={onClick}>
                <span className={grey ? styles.greyLabel : styles.label}>{label}</span>
                <img src='/img/arrow_black.svg' className={styles.iconArrow} />
            </div>
        );
    }
}