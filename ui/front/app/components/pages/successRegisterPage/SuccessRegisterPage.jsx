import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ArrowButton from '../../ui/common/arrowButton/ArrowButton';

import redirect from '../../../actions/redirect';

import styles from './SuccessRegisterPage.pcss';

class SuccessRegisterPage extends PureComponent {

    static propTypes = {
        walletNumber: PropTypes.number
    };

    handleRedirectToHome = () => {
        this.props.actions.redirect('/demo');
    };

    handleRedirectToSettings = () => {
        this.props.actions.redirect('/start-settings');
    };

    render() {
        const { walletNumber } = this.props;

        return (
            <I18n ns="translations">
                {
                    (t) => (
                        <div className={styles.wrapper}>
                            <div className={styles.closeWrapper}>
                                <img className={styles.closeIcon} src='/img/close.svg' />
                            </div>
                            <h2 className={styles.header}>{t('successRegistrationPage.header')}</h2>
                            <div className={styles.info}>
                                <p className={styles.infoText}>{t('successRegistrationPage.info')}</p>
                                <p className={styles.infoNumber}>{walletNumber}</p>
                            </div>
                            <div className={styles.wrapperArrowButtons}>
                                <div
                                    className={styles.wrapperArrowButtonsTitle}>{t('successRegistrationPage.beforeStartWork')}</div>
                                <ArrowButton
                                    label={t('successRegistrationPage.settings')}
                                    onClick={this.handleRedirectToSettings}
                                />
                                <ArrowButton
                                    label={t('successRegistrationPage.goToHome')}
                                    onClick={this.handleRedirectToHome}
                                />
                            </div>
                        </div>
                    )
                }
            </I18n>
        )
    }
}

function mapStateToProps(state) {
    const { application: {walletNumber} } = state;

    return {
        walletNumber
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            redirect
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessRegisterPage);
