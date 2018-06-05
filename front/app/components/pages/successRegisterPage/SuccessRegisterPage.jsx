import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ArrowButton from '../../ui/common/arrowButton/ArrowButton';

import redirect from '../../../actions/redirect';
import Translate from '../../decorators/Translate';

import { formatWalletNumber } from '../../../utils/format';

import styles from './SuccessRegisterPage.pcss';

@Translate()
class SuccessRegisterPage extends PureComponent {

    static propTypes = {
        walletNumber: PropTypes.number
    };

    componentDidMount() {
        if (!this.props.walletNumber) {
            this.props.actions.redirect('/login');
        }
    }

    handleRedirectToHome = () => {
        this.props.actions.redirect('/demo');
    };

    handleRedirectToSettings = () => {
        this.props.actions.redirect('/start-settings');
    };

    render() {
        const { walletNumber, translate: t } = this.props;

        return (

            <div className={styles.wrapper}>
                <div className={styles.closeWrapper}>
                    <img className={styles.closeIcon} src='/img/close.svg' onClick={this.handleRedirectToHome}/>
                </div>
                <h2 className={styles.header}>{t('successRegistrationPage.header')}</h2>
                <div className={styles.info}>
                    <p className={styles.infoText}>{t('successRegistrationPage.info')}</p>
                    <p className={styles.infoNumber}>{formatWalletNumber(walletNumber)}</p>
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
        );
    }
}

function mapStateToProps(state) {
    const { application: { walletNumber } } = state;

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
