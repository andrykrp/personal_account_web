import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { contains, append, without, pipe, filter, map, join } from 'ramda';

import Switch from '../../ui/common/switch/Switch';
import Checkbox from '../../ui/common/checkbox/Checkbox';
import ArrowInput from '../../ui/common/arrowInput/ArrowInput';
import Modal from '../../ui/common/modal/Modal';
import Header from '../../ui/common/header/Header';
import ListWithCheckbox from '../../ui/common/listWithCheckbox/ListWithCheckbox';

import redirect from '../../../actions/redirect';

import styles from './StartSettingsPage.pcss';

const listCurrency = [
    {
        'id': '2',
        'name': 'Евро',
        'symbol': '\u20AC'
    },
    {
        'id': '1',
        'name': 'Рубли',
        'symbol': '\u20BD'
    },
    {
        'id': '3',
        'name': 'франки',
        'symbol': '\u20A3'
    },
    {
        'id': '5',
        'name': 'Иена',
        'symbol': '\u00A5'
    },
    {
        'id': '6',
        'name': 'Донг',
        'symbol': '\u20AB'
    }
];

class StartSettingsPage extends PureComponent {
    state = {
        geoLocationOn: false,
        twoFactorAuth: false,
        showModalCurrency: false,
        selectCurrencies: [],
        checkSms: false,
        showModalGeoLocation: false
    };

    handleRedirectToBack = () => {
        window.history.back();
    };

    handleClickSwitchGeoLocation = () => {
        this.setState({
            geoLocationOn: !this.state.geoLocationOn
        });
    };

    handleClickSwitchTwoFactorAuth = () => {
        this.setState({
            twoFactorAuth: !this.state.twoFactorAuth,
            checkSms: !this.state.twoFactorAuth
        });
    };

    handleClickCheckbox = () => {
        this.setState({
            twoFactorAuth: !this.state.twoFactorAuth
        });
    };

    handleCloseModalCurrency = () => {
        this.setState({
            showModalCurrency: false
        });
    };

    handleOpenModalCurrency = () => {
        this.setState({
            showModalCurrency: true
        });
    };

    handleClickRowCurrency = (id) => {
        const { selectCurrencies } = this.state;

        this.setState({
            selectCurrencies: contains(id, selectCurrencies)
                ? without([id], selectCurrencies)
                : append(id, selectCurrencies)
        });
    };

    handleClickGeoLocation = () => {
      this.setState({
          showModalGeoLocation: true
      }) ;
    };

    handleCloseGeoLocationModal = () => {
      this.setState({
          showModalGeoLocation: false
      }) ;
    };

    render() {
        const
            { geoLocationOn, twoFactorAuth, showModalCurrency, selectCurrencies, checkSms, showModalGeoLocation } = this.state;

        let stringCurrencies = pipe(
            filter(({id}) => contains(id, selectCurrencies)),
            map(({name, symbol}) => `${name} (${symbol})`),
            join(', ')
        )(listCurrency);

        return (
            <I18n ns='translations'>
                {
                    (t) => (
                        <div className={styles.wrapper}>
                            <Header buttonClick={this.handleRedirectToBack} title={t('startSettingsPage.title')} />

                            <div className={styles.content}>

                                <div className={styles.settingColumn}>
                                    {
                                        selectCurrencies.length > 0 && (
                                            <span className={styles.label}>
                                                {t('startSettingsPage.settingThree.title')}
                                            </span>
                                        )
                                    }
                                    <ArrowInput label={selectCurrencies.length > 0 ? stringCurrencies : t('startSettingsPage.settingThree.title')}
                                                onClick={this.handleOpenModalCurrency} />
                                    <div className={styles.settingDesc}>{t('startSettingsPage.settingThree.desc')}</div>
                                </div>
                                <div className={styles.settingRow}>
                                    <div className={styles.settingContent}>
                                        <div
                                            className={styles.settingTitle}>{t('startSettingsPage.settingOne.title')}</div>
                                        <div
                                            className={styles.settingDesc}>{t('startSettingsPage.settingOne.desc')}</div>
                                        <div
                                            onClick={this.handleClickGeoLocation}
                                            className={styles.settingLocationName}>{t('startSettingsPage.settingOne.locationUndefined')}</div>

                                    </div>
                                    <Switch value={geoLocationOn} onClick={this.handleClickSwitchGeoLocation} />
                                </div>

                                <div className={styles.settingRow}>
                                    <div className={styles.settingContent}>
                                        <div
                                            className={styles.settingTitle}>{t('startSettingsPage.settingTwo.title')}</div>
                                        <div
                                            className={styles.settingDesc}>{t('startSettingsPage.settingTwo.desc')}</div>

                                    </div>
                                    <Switch value={twoFactorAuth} onClick={this.handleClickSwitchTwoFactorAuth} />
                                </div>
                                {
                                    twoFactorAuth && (
                                        <Checkbox label={t('startSettingsPage.settingTwo.withSMS')} value={checkSms}
                                                  onClick={this.handleClickCheckbox} />)
                                }
                            </div>
                            {
                                showModalCurrency && (
                                    <Modal>
                                        <Header title='Выберите валюты' buttonClick={this.handleCloseModalCurrency} />
                                        <ListWithCheckbox
                                            title='Список валют'
                                            list={listCurrency}
                                            maxSelect={3}
                                            selectArray={selectCurrencies}
                                            onClickRow={this.handleClickRowCurrency}
                                        />
                                    </Modal>
                                )
                            }

                        </div>
                    )
                }
            </I18n>
        );
    }
}

function mapStateToProps() {

    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            redirect
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StartSettingsPage);
