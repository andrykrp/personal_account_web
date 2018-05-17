import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n, translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Header } from 'semantic-ui-react';
import NotificationSystem from 'react-notification-system';

import LoginForm from '../../ui/forms/loginForm/LoginForm'

import login from '../../../actions/auth/login';
import redirect from '../../../actions/redirect';

import styles from './LoginPage.pcss';

class LoginPage extends PureComponent {

    handleSetRef = (refName) => component => {
        this[refName] = component;
    };

    handleSignIn = (login, password) => {

        this.props.actions.login(login, password).then(() => {
            this.props.actions.redirect('/demo');
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


    render() {
        return (
            <I18n ns="translations">
                {
                    (t) => (
                        <div className={styles.wrapper}>
                            <h2 className={styles.header}>{t('loginPage.title')}</h2>
                            <LoginForm
                                onSubmit={this.handleSignIn}
                            />
                            <div className={styles.wrapperLabel}>
                                <span className={styles.label}>{t('loginPage.notAccount')}<a className={styles.linkSignUp}>Sign Up</a></span>
                            </div>
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
            login,
            redirect
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
