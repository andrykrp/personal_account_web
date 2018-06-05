import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import InputForm from '../../form/inputForm/InputForm';
import InputFormWithMask from '../../form/inputFormWithMask/InputFormWithMask';
import Button from '../../common/button/Button';

import Translate from '../../../decorators/Translate';

import styles from './LoginForm.pcss';

@Translate()
class LoginForm extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func,
        onClickForgetPassword: PropTypes.func
    };

    state = {
        phone: '',
        password: '',
        disableButton: true
    };

    handleFieldChange = name => event => {
        this.setState({
            [name]: event.target.value,
            disableButton: this.state.password === '' || this.state.phone === ''
        });
    };

    handleSubmit = (event) => {
        const { phone, password } = this.state;
        const sendingLogin = phone.replace('+', '').replace('(', '').replace(')', '').replace('_', '');

        event.preventDefault();
        this.props.onSubmit(sendingLogin, password);
    };

    render() {
        const
            { translate: t} = this.props,
            { phone, password } = this.state;

        const disableButton = phone === '' || password === '';


        return (
            <form onSubmit={this.handleSubmit} className={styles.wrapper}>

                <InputFormWithMask
                    mask={['(', '+', /[1-9]/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                    placeholder={t('loginPage.loginForm.phone')}
                    value={phone}
                    onChange={this.handleFieldChange('phone')}
                    keepCharPositions={false}
                    name='phone'
                />
                <InputForm
                    type='password'
                    placeholder={t('loginPage.loginForm.password')}
                    name='password'
                    value={password}
                    onChange={this.handleFieldChange('password')} />
                <label
                    className={styles.linkResetPassword}
                    onClick={this.props.onClickForgetPassword}>
                    {t('loginPage.loginForm.forgotPass')}
                </label>
                <Button
                    disabled={disableButton}
                    label={t('loginPage.loginForm.buttonLogin')}
                    onClick={this.handleSubmit}
                />
            </form>
        );
    }
}

export default LoginForm;