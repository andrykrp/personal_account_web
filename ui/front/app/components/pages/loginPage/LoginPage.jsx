import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n, translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import LoginForm from '../../ui/forms/loginForm/LoginForm';
import Modal from '../../ui/common/modal/Modal';

import login from '../../../actions/auth/login';
import redirect from '../../../actions/redirect';
import checkAuthorized from '../../../actions/auth/checkAuthorized';
import getUser from '../../../actions/auth/getUser';

import styles from './LoginPage.pcss';

class LoginPage extends PureComponent {

    state = {
        showForgotPasswordModal: false
    };

    componentDidMount() {
        this.props.actions.checkAuthorized().then(() => {
            this.props.actions.redirect('/');
        });
    };

    handleSetRef = (refName) => component => {
        this[refName] = component;
    };

    handleSignIn = (login, password) => {

        this.props.actions.login(login, password).then(() => {
            this.props.actions.redirect('/');
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

    render() {
        const {showForgotPasswordModal} =this.state;

        return (
            <I18n ns='translations'>
                {
                    (t) => (
                        <div className={styles.wrapper}>
                            <div className={styles.closeWrapper}>
                                <img className={styles.logo} src='/img/close.svg'/>
                            </div>
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
                                        <img className={styles.socialButtonIcon} src='/img/social/wechat.svg'/>
                                    </button>
                                    <button className={styles.socialButton}>
                                        <img className={styles.socialButtonIcon} src='/img/social/telegram.svg'/>
                                    </button>
                                    <button className={styles.socialButton}>
                                        <img className={styles.socialButtonIcon} src='/img/social/mail.svg'/>
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
            login,
            redirect,
            checkAuthorized,
            getUser
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
