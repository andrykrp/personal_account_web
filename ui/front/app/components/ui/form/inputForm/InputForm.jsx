import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './InputForm.pcss';

const styleContext = classNames.bind(styles);

class InputForm extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.string,
        placeholder: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        maxLength: PropTypes.number,
        minLength: PropTypes.number
    };

    static defaultProps = {
        type: 'string'
    };

    render() {
        const
            { onChange, placeholder, value, name, type, maxLength, minLength } = this.props;
        const labelClasses = styleContext({
            label: true,
            labelHide: value === ''
        });

        return (
            <div className={styles.wrapper}>

                <label className={labelClasses} htmlFor={name}>
                    {placeholder}
                </label>
                <input placeholder={placeholder}
                       name={name}
                       value={value}
                       onChange={onChange}
                       className={styles.input}
                       type={type}
                       maxLength={maxLength}
                       minLength={minLength}
                />
            </div>
        )
    }
}

export default InputForm;