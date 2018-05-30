import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { I18n } from 'react-i18next';

import styles from './Checkbox.pcss';

const styleContext = classNames.bind(styles);

export default class Checkbox extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func,
        value: PropTypes.bool,
        label: PropTypes.string
    };

    render() {
        const { value, onClick, label } = this.props;
        const checkboxClasses = styleContext({
                checkbox: true,
                checkboxOn: value
            });

        return (
            <I18n ns='translations'>
                {
                    (t) => (
                        <div className={styles.wrapper} onClick={onClick}>
                            <div className={checkboxClasses}>
                                <div className={styles.checkOn} />
                            </div>
                            <div className={styles.label}>{label}</div>
                        </div>
                    )
                }
            </I18n>
        );
    }
}