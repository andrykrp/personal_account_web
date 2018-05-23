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
        type: PropTypes.string
    };

    static defaultProps  = {
        type: 'string'
    };

    state = {
        labelShow: this.props.value !== ''
    };

    render() {
        const
            { onChange, placeholder, value, name, type } = this.props,
            { labelShow } = this.state;

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
                />
            </div>
        )
    }
}

export default InputForm;