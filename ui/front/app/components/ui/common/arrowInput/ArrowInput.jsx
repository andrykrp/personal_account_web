import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next';

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
            <I18n ns='translations'>
                {
                    (t) => (
                        <div className={styles.wrapper} onClick={onClick}>
                            <span className={grey ? styles.greyLabel : styles.label}>{label}</span>
                            <img src='/img/arrow_black.svg' className={styles.iconArrow} />
                        </div>
                    )
                }
            </I18n>
        );
    }
}