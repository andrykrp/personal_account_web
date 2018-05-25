import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next';

import styles from './Modal.pcss';

export default class Modal extends PureComponent {
    static propTypes = {
        children: PropTypes.node
    };

    render() {
        const { children } = this.props;

        return (
            <I18n ns='translations'>
                {
                    (t) => (
                        <div className={styles.wrapper}>
                            {
                                children
                            }
                        </div>
                    )
                }
            </I18n>
        );
    }
}