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
        onChangeSearchValue: PropTypes.func,
        typeButton: PropTypes.string
    };

    static defaultProps = {
        typeButton: 'back'
    };

    state = {
        hideLogo: false
    };

    handleChangeInput = (event) => {
        this.props.onChangeSearchValue(event.target.value);
    };

    handleResetSearchValue = () => {
        this.props.onChangeSearchValue('');
        this.setState({
            hideLogo: false
        });
    };

    setFocusInput = () => {
        this.setState({
            hideLogo: true
        });
    };

    setBlurInput = () => {
        if (this.props.searchValue.length === 0) {
            this.setState({
                hideLogo: false
            });
        }
    };

    render() {
        const { buttonClick, searchValue, translate: t, typeButton } = this.props;

        const buttonClasses = styleContext({
            button: true,
            buttonBack: typeButton === 'back',
            buttonMenu: typeButton === 'menu'
        });

        const logoClasses = styleContext({
            logo: true,
            logoHidden: searchValue !== '' || this.state.hideLogo
        });

        const inputClasses = styleContext({
            searchInput: true,
            searchInputWide: searchValue !== '' || this.state.hideLogo
        });

        const resetButtonClasses = styleContext({
            resetButton: true,
            resetButtonHidden: searchValue === ''
        });

        return (

            <div className={styles.wrapper}>
                <button
                    onClick={buttonClick}
                    className={buttonClasses}
                />
                <div className={styles.wrapperInput}>
                    <input className={inputClasses} type='text' value={searchValue}
                           onChange={this.handleChangeInput}
                           onFocus={this.setFocusInput}
                           onBlur={this.setBlurInput}
                           placeholder={t('headerWithSearch.placeholder')}
                    />
                    <div className={resetButtonClasses} onClick={this.handleResetSearchValue}/>
                </div>
                <div className={logoClasses} />
            </div>
        );
    }
}