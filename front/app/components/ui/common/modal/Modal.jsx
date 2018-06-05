import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.pcss';

export default class Modal extends PureComponent {
    static propTypes = {
        children: PropTypes.node
    };

    render() {
        const { children } = this.props;

        return (

                        <div className={styles.wrapper}>
                            {
                                children
                            }
                        </div>

        );
    }
}