import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './PasswordStrengthMeter.pcss';

class PasswordStrengthMeter extends PureComponent {
    static propTypes = {
       strong: PropTypes.number
    };

    render() {
        const { strong } = this.props;
        let
            stylesLine = styles.line;

        if (strong === 3 ) {
            stylesLine = styles.redLine;
        }
        if (strong > 3) {
            stylesLine = styles.yellowLine;
        }
        if (strong >= 9) {
            stylesLine = styles.greenLine;
        }

        return (
            <div className={styles.wrapper}>
                <div className={strong >= 3 ? stylesLine : styles.line} />
                <div className={strong >= 3 ? stylesLine : styles.line} />
                <div className={strong >= 3 ? stylesLine : styles.line} />
                <div className={strong >= 6 ? stylesLine : styles.line} />
                <div className={strong >= 6 ? stylesLine : styles.line} />
                <div className={strong >= 6 ? stylesLine : styles.line} />
                <div className={strong >= 9 ? stylesLine : styles.line} />
                <div className={strong >= 9 ? stylesLine : styles.line} />
                <div className={strong >= 9 ? stylesLine : styles.line} />
            </div>
        )
    }

}

export default PasswordStrengthMeter;