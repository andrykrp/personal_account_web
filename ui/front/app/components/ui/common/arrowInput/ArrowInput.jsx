import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next';

import styles from './ArrowInput.pcss';

export default class ArrowInput extends PureComponent {
    static propTypes = {
        label: PropTypes.string,
        onClick: PropTypes.func
    };

    render() {
        const { label, onClick } = this.props;

        return (
            <I18n ns='translations'>
                {
                    (t) => (
                        <div className={styles.wrapper} onClick={onClick}>
                            <span className={styles.label}>{label}</span>
                            <img src='/img/arrow_black.svg' className={styles.iconArrow} />
                        </div>
                    )
                }
            </I18n>
        );
    }
}