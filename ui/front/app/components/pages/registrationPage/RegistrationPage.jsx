import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RegisterForm from '../../ui/forms/registerForm/RegisterForm';
import VerificationForm from '../../ui/forms/verificationForm/VerificationForm';
import PasswordForm from '../../ui/forms/passwordForm/PasswordForm';
import Modal from '../../ui/common/modal/Modal';

import verification from '../../../actions/register/verification';
import verificationCheck from '../../../actions/register/verificationCheck';
import registration from '../../../actions/register/registration';
import redirect from '../../../actions/redirect';
import showNotification from '../../../actions/notification/show';
import setTimer from '../../../actions/timer';
import login from '../../../actions/auth/login';

import styles from './RegistrationPage.pcss';

class RegistrationPage extends PureComponent {

    state = {
        step: 1,
        phone: '',
        code: '',
        showMoreInfoModal: false
    };

    componentDidMount() {
        const { params: { step }, phone, code } = this.props;

        if (this.props.authorized) {
            this.props.actions.redirect('/');
        }

        if (step === 'step1') {
            this.setState({
                step: 1
            });
        }
        if (step === 'step2') {
            if (phone) {
                this.setState({
                    step: 2
                });
            } else {
                this.setState({
                    step: 1
                });
            }

        }
        if (step === 'step3') {
            if (phone && code) {
                this.setState({
                    step: 3
                });
            } else {
                this.setState({
                    step: 1
                });
            }
        }
    }

    handleSubmitRegisterForm = (phone) => {

        this.props.actions.verification(phone).then(() => {
            this.setState({
                step: 2,
                phone: phone
            });

            this.props.actions.setTimer(new Date().getTime() + 90000);
            this.props.actions.redirect('/register/step2');
        });
    };

    handleSubmitVerificationForm = (code) => {
        const { phone } = this.props;

        this.props.actions.verificationCheck(phone, code).then(() => {
            this.setState({
                step: 3,
                code: code
            });
            this.props.actions.redirect('/register/step3');
        });
    };

    handleSubmitPasswordForm = (password) => {
        const { phone, code } = this.props;

        this.props.actions.registration(phone, code, password).then(() => {
            this.props.actions.login(phone, password);
            this.props.actions.redirect('/register/success');
        });
    };

    handleClose = () => {
        this.props.actions.redirect('/login');
    };

    handleClickMoreInfo = () => {
        this.setState({
            showMoreInfoModal: true
        });
    };

    handleCloseModal = () => {
        this.setState({
            showMoreInfoModal: false
        });
    };

    handleSendRetry = () => {
        this.props.actions.setTimer(new Date().getTime() + 90000);
    };

    render() {
        const
            { phone } = this.props,
            { step, showMoreInfoModal } = this.state;

        return (
            <I18n ns='translations'>
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
                                        <p className={styles.label}>{t('registerPage.step_2.comment')} {phone}</p>
                                        <VerificationForm
                                            onSubmit={this.handleSubmitVerificationForm}
                                            timer={this.props.timer}
                                            onClickSendRetry={this.handleSendRetry}
                                        />
                                    </div>
                                )
                            }
                            {
                                step === 3 && (
                                    <div>
                                        <p className={styles.label}>{t('registerPage.step_3.comment')}</p>
                                        <a onClick={this.handleClickMoreInfo}
                                           className={styles.linkInfo}>{t('registerPage.step_3.moreInfo')}</a>
                                        <PasswordForm
                                            onSubmit={this.handleSubmitPasswordForm}
                                        />
                                    </div>
                                )
                            }
                            {
                                showMoreInfoModal && (
                                    <Modal>
                                        <div>
                                            <div className={styles.closeWrapper} onClick={this.handleCloseModal}>
                                                <img className={styles.logo} src='/img/close.svg' />
                                            </div>
                                            <h2 className={styles.title}>{t('registerPage.step_3.titleMoreInfo')}</h2>
                                            <p className={styles.label}>{t('registerPage.step_3.requirements')}</p>
                                        </div>
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

function mapStateToProps(state, props) {
    const { registration: { phone, code }, application: { authorized }, timer: { timer } } = state;

    return {
        phone,
        code,
        authorized,
        timer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            verification,
            registration,
            verificationCheck,
            redirect,
            showNotification,
            setTimer,
            login
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
