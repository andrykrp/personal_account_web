import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import InputForm from '../../form/inputForm/InputForm';
import PasswordStrengthMeter from '../../common/passwordStrengthMeter/PasswordStrengthMeter';

import Translate from '../../../decorators/Translate';

import styles from './PasswordForm.pcss';

const minLength = 6;

@Translate()
class PasswordForm extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func
    };

    state = {
        password: '',
        retryPassword: '',
        strong: 0
    };

    handleFieldChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        const { password } = this.state;

        event.preventDefault();
        this.props.onSubmit(password);
    };

    render() {
        const
            { translate: t } = this.props,
            { password, retryPassword } = this.state;
        let
            strong = 0;

        if (password.length === minLength) {
            strong = 3;
        }
        if (password.length > minLength) {
            strong = 6;
        }
        if (password.length >= minLength * 2) {
            strong = 9;
        }

        const checkPassword = !(password === retryPassword && strong === 3);

        return (

            <form onSubmit={this.handleSubmit} className={styles.wrapper}>
                <InputForm
                    value={password}
                    onChange={this.handleFieldChange('password')}
                    placeholder={t('passwordForm.password')}
                    name='password'
                    type='password'
                />
                <PasswordStrengthMeter
                    strong={strong}
                />

                <InputForm
                    value={retryPassword}
                    onChange={this.handleFieldChange('retryPassword')}
                    placeholder={t('passwordForm.retryPassword')}
                    name='retryPassword'
                    type='password'
                />

                <div className={styles.errorMessage}>
                    {password !== retryPassword ? t('passwordForm.errorRetry') : ''}
                </div>

                <button
                    type='submit'
                    onClick={this.handleSubmit}
                    className={styles.button}
                    disabled={!((password === retryPassword) && strong >= 3)}
                >
                    {t('passwordForm.submitButton')}
                </button>
            </form>
        );
    }
}

export default PasswordForm;