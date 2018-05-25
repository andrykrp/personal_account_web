import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {I18n} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CookiesActions from 'js-cookie';

import Switch from '../../ui/common/switch/Switch';
import Checkbox from '../../ui/common/checkbox/Checkbox';
import ArrowInput from '../../ui/common/arrowInput/ArrowInput';
import Modal from '../../ui/common/modal/Modal';
import Header from '../../ui/common/header/Header';
import ListWithCheckbox from '../../ui/common/listWithCheckbox/ListWithCheckbox';

import redirect from '../../../actions/redirect';

import styles from './StartSettingsPage.pcss';

const listCurrency = CookiesActions.get('listCurrencies');

class StartSettingsPage extends PureComponent {

    state = {
        geoLocationOn: false,
        twoFactorAuth: false,
        showModalCurrency: false,
        selectCurrencies: [],
        checkSms: false
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

    handleOpenModalCurrency =() => {
        this.setState({
            showModalCurrency: true
        });
    };

    render() {
        const {geoLocationOn, twoFactorAuth, showModalCurrency, selectCurrencies, checkSms} = this.state;

        return (
            <I18n ns='translations'>
                {
                    (t) => (
                        <div className={styles.wrapper}>
                            <Header buttonClick={this.handleRedirectToBack} title={t('startSettingsPage.title')}/>

                            <div className={styles.content}>
                                <div className={styles.settingColumn}>
                                    <ArrowInput label={t('startSettingsPage.settingThree.title')} onClick={this.handleOpenModalCurrency}/>
                                    <div className={styles.settingDesc}>{t('startSettingsPage.settingThree.desc')}</div>
                                </div>
                                <div className={styles.settingRow}>
                                    <div className={styles.settingContent}>
                                        <div
                                            className={styles.settingTitle}>{t('startSettingsPage.settingOne.title')}</div>
                                        <div
                                            className={styles.settingDesc}>{t('startSettingsPage.settingOne.desc')}</div>
                                        <div
                                            className={styles.settingLocationName}>{t('startSettingsPage.settingOne.locationUndefined')}</div>

                                    </div>
                                    <Switch value={geoLocationOn} onClick={this.handleClickSwitchGeoLocation}/>
                                </div>

                                <div className={styles.settingRow}>
                                    <div className={styles.settingContent}>
                                        <div
                                            className={styles.settingTitle}>{t('startSettingsPage.settingTwo.title')}</div>
                                        <div
                                            className={styles.settingDesc}>{t('startSettingsPage.settingTwo.desc')}</div>

                                    </div>
                                    <Switch value={twoFactorAuth} onClick={this.handleClickSwitchTwoFactorAuth}/>
                                </div>
                                {
                                    twoFactorAuth && (
                                        <Checkbox label={t('startSettingsPage.settingTwo.withSMS')} value={checkSms} onClick={this.handleClickCheckbox}/>)
                                }
                            </div>
                            {
                                showModalCurrency && (
                                    <Modal>
                                        <Header title='Test' buttonClick={this.handleCloseModalCurrency}/>
                                        <ListWithCheckbox
                                            title='Список валют'
                                            list={listCurrency}
                                            maxSelect={3}
                                            selectArray={selectCurrencies}
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
