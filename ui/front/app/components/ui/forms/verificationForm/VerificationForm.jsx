import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n, translate } from 'react-i18next';

import InputForm from '../../form/inputForm/InputForm';

import styles from './VerificationForm.pcss';

class VerificationForm extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func
    };

    state = {
        verificationCode: ''
    };

    handleFieldChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    };

    handleSubmit = (event) => {
        const { verificationCode } = this.state;

        event.preventDefault();
        this.props.onSubmit(verificationCode);
    };

    render() {
        const { verificationCode } = this.state;

        return (
            <I18n ns="translations">
                {
                    (t) => (
                        <form onSubmit={this.handleSubmit} className={styles.wrapper}>
                            <InputForm
                                value={verificationCode}
                                onChange={this.handleFieldChange('verificationCode')}
                                placeholder={t('verificationForm.verificationCode')}
                                name='verificationCode'
                            />
                            <p className={styles.label}>
                                {t('verificationForm.retrySend')}
                            </p>
                            <button type='submit' onClick={this.handleSubmit} className={styles.button}>{t('verificationForm.buttonContinue')}</button>
                        </form>
                    )
                }
            </I18n>
        )
    }
}

export default VerificationForm;