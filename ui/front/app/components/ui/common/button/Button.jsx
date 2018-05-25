import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Button.pcss';

const styleContext = classNames.bind(styles);

class Button extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        label: PropTypes.string,
        type: PropTypes.string
    };

    static defaultProps = {
        type: 'text'
    };

    render() {
        const { label, disabled, onClick, type } = this.props;

        return (
            <button
                type={type}
                onClick={onClick}
                className={styles.primary}
                disabled={disabled}
            >
                {label}
            </button>

        )
    }
}

export default Button;