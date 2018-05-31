import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import LoginForm from '../../ui/forms/loginForm/LoginForm';
import Modal from '../../ui/common/modal/Modal';
import VerificationForm from '../../ui/forms/verificationForm/VerificationForm';
import Button from '../../ui/common/button/Button';

import login from '../../../actions/auth/login';
import redirect from '../../../actions/redirect';
import checkAuthorized from '../../../actions/auth/checkAuthorized';
import getUser from '../../../actions/auth/getUser';
import setTimer from '../../../actions/timer';
import verification from '../../../actions/register/verification';
import verificationCheck from '../../../actions/register/verificationCheck';

import Translate from '../../decorators/Translate';

import styles from './LoginPage.pcss';
import { isNotEmpty } from '../../../utils/lomda';

@Translate()
class LoginPage extends PureComponent {

    state = {
        showForgotPasswordModal: false,
        stage: 1,
        login: ''
    };

    componentDidMount() {
        /*this.props.actions.checkAuthorized().then(() => {
            this.props.actions.redirect('/');
        });*/

        if (isNotEmpty(this.props.user)) {
            this.props.actions.redirect('/');
        }
    };

    handleSetRef = (refName) => component => {
        this[refName] = component;
    };

    handleSignIn = (login, password) => {
        this.setState({
            login: login
        });
        this.props.actions.login(login, password).then(() => {
            this.props.actions.checkAuthorized().then(() => {
                    this.props.actions.getUser().then(() => {
                        this.props.actions.redirect('/');
                    });
                }
            ).catch((error) => {
                if (error.response.data.type === 'LOGIN') {
                    this.setState({
                        stage: 2
                    });
                }
            });
        }).catch((error) => {
            if (error.response.data.type === 'LOGIN') {
                this.setState({
                    stage: 2
                });
            }
        });
    };

    handleForgetPassword = () => {
        this.setState({
            showForgotPasswordModal: true
        });
    };

    handleCloseModal = () => {
        this.setState({
            showForgotPasswordModal: false
        });
    };

    handleSendRetry = () => {
        this.props.actions.setTimer(new Date().getTime() + 90000);
    };

    handleClickVerificationButton = () => {
        this.props.actions.verification(this.state.login, 'LOGIN').then(() => {
            this.props.actions.setTimer(new Date().getTime() + 90000);
            this.setState({
                stage: 3
            });
        });
    };

    handleSubmitVerificationForm = (code) => {
        this.props.actions.verificationCheck(this.state.login, code, 'LOGIN').then(() => {
            this.props.actions.checkAuthorized().then(() => {
                this.props.actions.getUser();
            });
            this.props.actions.redirect('/');
        });
    };

    render() {
        const
            { translate: t } = this.props,
            { showForgotPasswordModal, stage } = this.state;

        return (

            <div className={styles.wrapper}>
                <div className={styles.closeWrapper}>
                    <img className={styles.logo} src='/img/close.svg' />
                </div>
                {
                    stage === 1 && (
                        <div className={styles.content}>
                            <LoginForm
                                onSubmit={this.handleSignIn}
                                onClickForgetPassword={this.handleForgetPassword}
                            />
                            <div className={styles.socialBlock}>
                                <p className={styles.socialBlockTitle}>
                                    {t('loginPage.signInWith')}
                                </p>
                                <div className={styles.socialBlockWrapperButton}>
                                    <button className={styles.socialButton}>
                                        <img className={styles.socialButtonIcon}
                                             src='/img/social/wechat.svg' />
                                    </button>
                                    <button className={styles.socialButton}>
                                        <img className={styles.socialButtonIcon}
                                             src='/img/social/telegram.svg' />
                                    </button>
                                    <button className={styles.socialButton}>
                                        <img className={styles.socialButtonIcon}
                                             src='/img/social/mail.svg' />
                                    </button>
                                </div>
                            </div>
                            <div className={styles.wrapperLabel}>
                                <span className={styles.label}>{t('loginPage.notAccount')}</span>
                                <Link
                                    className={styles.linkSignUp}
                                    to={'/register'}>
                                    {t('loginPage.signUp')}
                                </Link>
                            </div>
                            <div className={styles.switchLanguage}>
                                <button className={styles.switchLanguageButton}>
                                    RU
                                </button>
                            </div>
                        </div>)
                }
                {
                    stage === 2 && (
                        <div className={styles.content}>
                            <div className={styles.headerWrapper}>
                                <h1 className={styles.header}>{t('loginPage.security.header')}</h1>
                                <p className={styles.info}>{t('loginPage.security.description')}</p>
                                <p className={styles.warning}
                                   dangerouslySetInnerHTML={{ __html: t('loginPage.security.warning') }} />
                                <p className={styles.info}>{t('loginPage.security.comment')}</p>
                                <Button
                                    onClick={this.handleClickVerificationButton}
                                    label={t('loginPage.security.buttonLabel')}
                                />
                            </div>
                        </div>)
                }
                {
                    stage === 3 && (
                        <div className={styles.content}>
                            <div className={styles.headerWrapper}>
                                <h1 className={styles.header}>{t('loginPage.verification.header')}</h1>
                                <h2 className={styles.title}>{t('loginPage.verification.title')}</h2>
                                <p className={styles.comment}>{t('loginPage.verification.comment')} </p>
                            </div>
                            <VerificationForm
                                onSubmit={this.handleSubmitVerificationForm}
                                timer={this.props.timer}
                                onClickSendRetry={this.handleSendRetry}
                            />
                        </div>)
                }
                <NotificationSystem ref={this.handleSetRef('notification')} />
                {
                    showForgotPasswordModal && (
                        <Modal>
                            <div className={styles.modalWrapper}>
                                <div className={styles.closeWrapper} onClick={this.handleCloseModal}>
                                    <img className={styles.logo} src='/img/close.svg' />
                                </div>
                                <h2 className={styles.title}>{t('loginPage.resetPasswordTitle')}</h2>
                                <p className={styles.description}>{t('loginPage.resetPasswordDesc')}</p>
                            </div>
                        </Modal>
                    )
                }
            </div>

        );
    }
}

function mapStateToProps(state, props) {
    const { timer: { timer }, application: { user } } = state;

    return {
        timer,
        user
    };
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            login,
            redirect,
            checkAuthorized,
            getUser,
            setTimer,
            verificationCheck,
            verification
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
