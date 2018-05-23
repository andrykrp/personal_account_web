import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { I18n } from 'react-i18next';

import styles from './Switch.pcss';

const styleContext = classNames.bind(styles);

export default class Switch extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func,
        value: PropTypes.bool
    };

    render() {
        const { value, onClick } = this.props;
        const
            switchClasses = styleContext({
                switch: true,
                switchOn: value,
                switchOff: !value
            }),
            wrapperClasses = styleContext({
                wrapper: true,
                wrapperOn: value
            });

        return (
            <I18n ns="translations">
                {
                    (t) => (
                        <div className={wrapperClasses} onClick={onClick}>
                            <div className={switchClasses} />
                        </div>
                    )
                }
            </I18n>
        )
    }
}