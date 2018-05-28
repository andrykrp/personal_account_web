import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next';
import classNames from 'classnames/bind';

import styles from './Header.pcss';

const styleContext = classNames.bind(styles);

export default class Header extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        buttonClick: PropTypes.func,
        typeButton: PropTypes.string
    };

    static defaultProps = {
        typeButton: 'back'
    };

    render() {
        const { title, buttonClick, typeButton } = this.props;

        const buttonClasses = styleContext({
            button: true,
            buttonBack: typeButton === 'back',
            buttonLogin: typeButton === 'login',
            buttonLogout: typeButton === 'logout'
        });

        return (
            <I18n ns='translations'>
                {
                    (t) => (
                        <div className={styles.wrapper}>
                            <button
                                onClick={buttonClick}
                                className={buttonClasses}
                            />
                            {
                                title && (
                                    <div className={styles.title}>{title}</div>
                                )
                            }
                            <div className={styles.logo} />
                        </div>
                    )
                }
            </I18n>
        );
    }
}