import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {I18n} from 'react-i18next';

import Checkbox from '../checkbox/Checkbox';

import styles from './ListWithCheckbox.pcss';

export default class ListWithCheckbox extends PureComponent {
    static propTypes = {
        list: PropTypes.array,
        maxSelect: PropTypes.number,
        title: PropTypes.string,
        selectArray: PropTypes.array
    };

    renderRowList = (item) => {

    };

    render() {
        const {list, maxSelect, title} = this.props;

        return (
            <I18n ns='translations'>
                {
                    (t) => (
                        <div className={styles.wrapper}>
                            <div>

                            </div>
                        </div>
                    )
                }
            </I18n>
        );
    }
}