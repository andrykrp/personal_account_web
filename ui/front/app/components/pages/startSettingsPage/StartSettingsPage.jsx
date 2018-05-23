import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Switch from '../../ui/common/switch/Switch';
import Checkbox from '../../ui/common/checkbox/Checkbox';

import redirect from '../../../actions/redirect';

import styles from './StartSettingsPage.pcss';

class StartSettingsPage extends PureComponent {

    state = {
        geoLocationOn: false,
        twoFactorAuth: false
    };

    handleRedirectToBack = () => {
        window.history.back()
    };

    handleClickSwitchGeoLocation = () => {
        this.setState({
            geoLocationOn: !this.state.geoLocationOn
        })
    };

    handleClickSwitchTwoFactorAuth = () => {
        this.setState({
            twoFactorAuth: !this.state.twoFactorAuth
        })
    };

    render() {
        const { geoLocationOn, twoFactorAuth } = this.state;

        return (
            <I18n ns="translations">
                {
                    (t) => (
                        <div className={styles.wrapper}>
                            <div className={styles.header}>
                                <button
                                    className={styles.backButton}
                                    onClick={this.handleRedirectToBack}
                                />
                                {t('startSettingsPage.title')}
                                <div className={styles.logo} />
                            </div>
                            <div className={styles.content}>
                                <div className={styles.settingRow}>
                                    <div className={styles.settingContent}>
                                        <div
                                            className={styles.settingTitle}>{t('startSettingsPage.settingOne.title')}</div>
                                        <div
                                            className={styles.settingDesc}>{t('startSettingsPage.settingOne.desc')}</div>
                                        <div
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
                                    twoFactorAuth &&(
                                        <Checkbox label={t('startSettingsPage.settingTwo.withSMS')}/>)
                                }
                            </div>
                        </div>
                    )
                }
            </I18n>
        )
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
