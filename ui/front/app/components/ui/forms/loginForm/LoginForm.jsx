import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n, translate } from 'react-i18next';
import { Button, Checkbox, Form } from 'semantic-ui-react';

import styles from './LoginForm.pcss';

class LoginForm extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func
    };

    state = {
        login: '',
        password: ''
    };

    handleFieldChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    };

    handleSubmit = (event) => {
        const { login, password } = this.state;

        event.preventDefault();
        this.props.onSubmit(login, password);
    };

    render() {
        const { login, password } = this.state;

        return (
            <I18n ns="translations">
                {
                    (t) => (
                        <form onSubmit={this.handleSubmit} className={styles.wrapper}>
                            <input placeholder= {t('loginPage.loginForm.phone')} name='login' value={login}
                                   onChange={this.handleFieldChange('login')} className={styles.input} />

                            <input type='password' placeholder={t('loginPage.loginForm.password')} name='password' value={password}
                                   onChange={this.handleFieldChange('password')} className={styles.input} />

                            <label className={styles.linkResetPassword}>
                                {t('loginPage.loginForm.forgotPass')}
                            </label>
                            <button type='submit' onClick={this.handleSubmit} className={styles.button}>{t('loginPage.loginForm.buttonLogin')}</button>
                        </form>
                    )
                }
            </I18n>
        )
    }
}

export default LoginForm;