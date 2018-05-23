import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n, translate } from 'react-i18next';

import InputForm from '../../form/inputForm/InputForm';

import styles from './RegisterForm.pcss';

class RegisterForm extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func
    };

    state = {
        phone: ''
    };

    handleFieldChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    };

    handleSubmit = (event) => {
        const { phone } = this.state;

        event.preventDefault();
        this.props.onSubmit(phone);
    };

    render() {
        const { phone } = this.state;

        return (
            <I18n ns="translations">
                {
                    (t) => (
                        <form onSubmit={this.handleSubmit} className={styles.wrapper}>
                            <div>
                                <p className={styles.label}>{t('registerForm.enterPhone')}</p>
                            </div>
                            <InputForm
                                value={phone}
                                onChange={this.handleFieldChange('phone')}
                                placeholder={t('registerForm.phone')}
                                name='phone'
                            />
                            <button type='submit' onClick={this.handleSubmit} className={styles.button}>{t('registerForm.buttonContinue')}</button>
                        </form>
                    )
                }
            </I18n>
        )
    }
}

export default RegisterForm;