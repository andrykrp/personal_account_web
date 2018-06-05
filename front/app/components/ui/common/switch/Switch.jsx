import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Switch.pcss';

const styleContext = classNames.bind(styles);

export default class Switch extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func,
        value: PropTypes.bool,
        disabled: PropTypes.bool
    };

    static defaultProps = {
        disabled: false
    };

    handleClick = () => {
        if (!this.props.disabled) {
            this.props.onClick();
        } else {

        }

    };

    render() {
        const { value, disabled } = this.props;
        const
            switchClasses = styleContext({
                switch: true,
                switchOn: value,
                switchOff: !value,
                disabledSwitch: disabled
            }),
            wrapperClasses = styleContext({
                wrapper: true,
                wrapperOn: value,
                disabledWrapper: disabled
            });

        return (

                        <div className={wrapperClasses} onClick={this.handleClick}>
                            <div className={switchClasses} />
                        </div>

        );
    }
}