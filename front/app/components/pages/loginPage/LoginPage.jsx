import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n, translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import LoginForm from '../../ui/forms/loginForm/LoginForm'

import login from '../../../actions/auth/login';
import redirect from '../../../actions/redirect';

import styles from './LoginPage.pcss';

class LoginPage extends PureComponent {


    handleSignIn = (login, password) => {
        this.props.actions.login(login, password).then(() => {
            this.props.actions.redirect('/demo');
        });
    };


    render() {
        return (
            <I18n ns="translations">
                {
                    (t) => (
                        <div className={styles.wrapper}>
                            <LoginForm
                                onSubmit={this.handleSignIn}
                            />
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
