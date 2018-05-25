import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n, translate } from 'react-i18next';

import InputForm from '../../form/inputForm/InputForm';
import InputFormWithMask from '../../form/inputFormWithMask/InputFormWithMask';
import Button from '../../common/button/Button';

import styles from './LoginForm.pcss';

class LoginForm extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func,
        onClickForgetPassword: PropTypes.func
    };

    state = {
        login: '',
        password: '',
        disableButton: true
    };

    handleFieldChange = name => event => {
        this.setState({
            [name]: event.target.value,
            disableButton: this.state.password === '' || this.state.login === ''
        });
    };

    handleSubmit = (event) => {
        const { login, password } = this.state;
        const sendingLogin = login.replace('+', '').replace('(', '').replace(')', '').replace('_', '');

        event.preventDefault();
        this.props.onSubmit(sendingLogin, password);
    };

    render() {
        const { login, password } = this.state;

        return (
            <I18n ns='translations'>
                {
                    (t) => (
                        <form onSubmit={this.handleSubmit} className={styles.wrapper}>

                            <InputFormWithMask
                                mask={['(', '+', /[1-9]/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                placeholder={t('loginPage.loginForm.phone')}
                                value={login}
                                onChange={this.handleFieldChange('login')}
                                keepCharPositions={false}
                            />
                            <InputForm
                                type='password'
                                placeholder={t('loginPage.loginForm.password')}
                                name='password'
                                value={password}
                                onChange={this.handleFieldChange('password')} />
                            <label className={styles.linkResetPassword} onClick={this.props.onClickForgetPassword}>
                                {t('loginPage.loginForm.forgotPass')}
                            </label>
                            <Button
                                disabled={this.state.disableButton}
                                label={t('loginPage.loginForm.buttonLogin')}
                                onClick={this.handleSubmit}
                            />
                        </form>
                    )
                }
            </I18n>
        );
    }
}

export default LoginForm;