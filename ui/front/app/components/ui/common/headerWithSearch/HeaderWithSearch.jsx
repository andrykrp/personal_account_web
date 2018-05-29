import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next';
import classNames from 'classnames/bind';

import styles from './HeaderWithSearch.pcss';

const styleContext = classNames.bind(styles);

export default class HeaderWithSearch extends PureComponent {
    static propTypes = {
        buttonClick: PropTypes.func,
        searchValue: PropTypes.string,
        onChangeSearchValue: PropTypes.func
    };

    handleChangeInput = (event) => {
        this.props.onChangeSearchValue(event.target.value);
    };

    render() {
        const { buttonClick, searchValue } = this.props;

        const buttonClasses = styleContext({
            button: true,
            buttonBack: true
        });

        const logoClasses = styleContext({
            logo: true,
            logoHidden: searchValue !== ''
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
                            <input className={styles.searchInput} type='text' value={searchValue}
                                   onChange={this.handleChangeInput}
                                   placeholder={t('headerWithSearch.placeholder')}
                            />
                            <div className={logoClasses} />
                        </div>
                    )
                }
            </I18n>
        );
    }
}