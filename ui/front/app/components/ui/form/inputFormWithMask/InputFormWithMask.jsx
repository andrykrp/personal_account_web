import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import MaskedInput from 'react-text-mask';

import styles from './InputFormWithMask.pcss';

const styleContext = classNames.bind(styles);

class InputFormWithMask extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.string,
        placeholder: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        mask: PropTypes.array
    };

    static defaultProps  = {
        type: 'string'
    };

    render() {
        const
            { onChange, placeholder, value, mask } = this.props;

        const labelClasses = styleContext({
            label: true,
            labelHide: value === ''
        });

        return (
            <div className={styles.wrapper}>
                <label className={labelClasses}>
                    {placeholder}
                </label>
                <MaskedInput
                    mask={mask}
                    className={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    keepCharPositions={false}
                    guide={false}
                />
            </div>
        )
    }
}

export default InputFormWithMask;