import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';

import RegisterForm from '../../ui/forms/registerForm/RegisterForm';
import VerificationForm from '../../ui/forms/verificationForm/VerificationForm';
import PasswordForm from '../../ui/forms/passwordForm/PasswordForm';

import verification from '../../../actions/register/verification';
import verificationCheck from '../../../actions/register/verificationCheck';
import registration from '../../../actions/register/registration';
import redirect from '../../../actions/redirect';

import styles from './RegisterPage.pcss';

class RegisterPage extends PureComponent {

    state = {
        step: 1,
        phone: '',
        code: ''
    };

    handleSetRef = (refName) => component => {
        this[refName] = component;
    };

    handleSubmitRegisterForm = (phone) => {

        this.props.actions.verification(phone).then(() => {
            this.setState({
                step: 2,
                phone: phone
            });

            return;
        }).catch(() => {
            this.notification.addNotification({
                title: 'Error',
                message: 'Login failed',
                autoDismiss: 3,
                level: 'error',
                position: 'tr'
            });
        });
    };

    handleSubmitVerificationForm = (code) => {
        const {phone} = this.state;

        this.props.actions.verificationCheck(phone, code).then(() => {
            this.setState({
                step: 3,
                code: code
            });

            return;
        }).catch(() => {
            this.notification.addNotification({
                title: 'Error',
                message: 'Login failed',
                autoDismiss: 3,
                level: 'error',
                position: 'tr'
            });
        });
    };

    handleSubmitPasswordForm = (password) => {
        const {phone, code} = this.state;

        this.props.actions.registration(phone, code, password).then(() => {
            this.props.actions.redirect('/register/success');

            return;
        }).catch(() => {
            this.notification.addNotification({
                title: 'Error',
                message: 'Login failed',
                autoDismiss: 3,
                level: 'error',
                position: 'tr'
            });
        });
    };

    handleClose = () => {
        this.props.actions.redirect('/login');
    };

    render() {
        const { step } = this.state;

        return (
            <I18n ns="translations">
                {
                    (t) => (
                        <div className={styles.wrapper}>
                            <div className={styles.closeWrapper} onClick={this.handleClose}>
                                <img className={styles.logo} src='/img/close.svg' />
                            </div>
                            <h2 className={styles.header}>{t('registerPage.header')}</h2>
                            {
                                step === 1 && (
                                    <div>
                                        <RegisterForm
                                            onSubmit={this.handleSubmitRegisterForm}
                                        />
                                        <div className={styles.wrapperLabel}>
                                            <p className={styles.label}>{t('registerPage.step_1.comment')}</p>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                step === 2 && (
                                    <div>
                                        <h2 className={styles.title}>{t('registerPage.step_2.title')}</h2>
                                        <p className={styles.label}>{t('registerPage.step_2.comment')}</p>
                                        <VerificationForm
                                            onSubmit={this.handleSubmitVerificationForm}
                                        />
                                    </div>
                                )
                            }
                            {
                                step === 3 && (
                                    <div>
                                        <p className={styles.label}>{t('registerPage.step_3.comment')}</p>
                                        <PasswordForm
                                            onSubmit={this.handleSubmitPasswordForm}
                                        />
                                    </div>
                                )
                            }
                            <NotificationSystem ref={this.handleSetRef('notification')} />
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
            verification,
            registration,
            verificationCheck,
            redirect
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
