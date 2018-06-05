import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Translate from '../../../decorators/Translate';

import styles from './HeaderWithSearch.pcss';

const styleContext = classNames.bind(styles);

@Translate()
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
        const { buttonClick, searchValue, translate: t } = this.props;

        const buttonClasses = styleContext({
            button: true,
            buttonBack: true
        });

        const logoClasses = styleContext({
            logo: true,
            logoHidden: searchValue !== ''
        });

        return (

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
        );
    }
}