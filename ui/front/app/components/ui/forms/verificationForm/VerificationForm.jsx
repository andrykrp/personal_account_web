import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n, translate } from 'react-i18next';

import Button from '../../common/button/Button';
import InputForm from '../../form/inputForm/InputForm';
import Countdown from '../../common/Countdown/Countdown';

import styles from './VerificationForm.pcss';

class VerificationForm extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func,
        timer: PropTypes.number,
        onClickSendRetry: PropTypes.func
    };

    state = {
        verificationCode: '',
        disableButton: true,
        showRetrySendCode: false
    };

    handleFieldChange = name => event => {
        this.setState({
            [name]: event.target.value
        }, () => {
            this.setState({
                disableButton: this.state.verificationCode.length !== 6
            });
        });
    };

    handleSubmit = (event) => {
        const { verificationCode } = this.state;

        event.preventDefault();
        this.props.onSubmit(verificationCode);
    };

    timerExpired = () => {
        this.setState({
            showRetrySendCode: true
        });
    };

    handleSentRetry = () => {
        this.setState({
            showRetrySendCode: false
        });
        this.props.onClickSendRetry();
    };

    render() {
        const
            { timer } = this.props,
            { verificationCode, showRetrySendCode } = this.state;

        return (
            <I18n ns='translations'>
                {
                    (t) => (
                        <form onSubmit={this.handleSubmit} className={styles.wrapper}>
                            <InputForm
                                value={verificationCode}
                                onChange={this.handleFieldChange('verificationCode')}
                                placeholder={t('verificationForm.verificationCode')}
                                name='verificationCode'
                                maxLength={6}
                                minLength={6}
                            />
                            {
                                showRetrySendCode && (
                                    <a className={styles.resendLabel} onClick={this.handleSentRetry}>{t('verificationForm.resend')}</a>
                                ) || (
                                    <p className={styles.label}>
                                        {t('verificationForm.retrySend')}
                                        <Countdown
                                            target={timer}
                                            onExpired={this.timerExpired}
                                        />
                                    </p>
                                )
                            }
                            <Button
                                disabled={this.state.disableButton}
                                label={t('verificationForm.buttonContinue')}
                                onClick={this.handleSubmit}
                            />
                        </form>
                    )
                }
            </I18n>
        );
    }
}

export default VerificationForm;