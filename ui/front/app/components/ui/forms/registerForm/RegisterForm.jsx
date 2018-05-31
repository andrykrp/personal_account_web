import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import InputFormWithMask from '../../form/inputFormWithMask/InputFormWithMask';
import Button from '../../common/button/Button';

import styles from './RegisterForm.pcss';

class RegisterForm extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func
    };

    state = {
        phone: '',
        disableButton: true
    };

    handleFieldChange = name => event => {
        this.setState({
            [name]: event.target.value,
            disableButton: this.state.phone === ''
        });
    };

    handleSubmit = (event) => {
        const { phone } = this.state;
        const sendingPhone = phone.replace('+', '').replace('(', '').replace(')', '').replace('_', '');

        event.preventDefault();
        this.props.onSubmit(sendingPhone);
    };

    render() {
        const
            { translate: t } = this.props,
            { phone, disableButton } = this.state;

        return (

            <form onSubmit={this.handleSubmit} className={styles.wrapper}>
                <div>
                    <p className={styles.label}>{t('registerForm.enterPhone')}</p>
                </div>
                <InputFormWithMask
                    mask={['(', '+', /[1-9]/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                    placeholder={t('registerForm.phone')}
                    value={phone}
                    onChange={this.handleFieldChange('phone')}
                    keepCharPositions={false}
                />
                <Button
                    disabled={disableButton}
                    label={t('registerForm.buttonContinue')}
                    onClick={this.handleSubmit}
                />
            </form>
        );
    }
}

export default RegisterForm;