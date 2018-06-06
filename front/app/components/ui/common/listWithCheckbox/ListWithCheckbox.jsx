import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next';
import { map, contains } from 'ramda';

import Switch from '../switch/Switch';

import Translate from '../../../decorators/Translate';

import styles from './ListWithCheckbox.pcss';

@Translate()
export default class ListWithCheckbox extends PureComponent {
    static propTypes = {
        list: PropTypes.array,
        maxSelect: PropTypes.number,
        title: PropTypes.string,
        selectArray: PropTypes.array,
        onClickRow: PropTypes.func
    };

    handleClickRow = (id) => {
        const { selectArray, maxSelect } = this.props;

        if (contains(id, selectArray) && selectArray.length >= maxSelect || selectArray.length < maxSelect) {
            this.props.onClickRow(id);
        }
    };

    renderRowList = (item) => (
        <div key={item.id} className={styles.row} onClick={() => this.handleClickRow(item.id)}>
            <div className={styles.rowName}>
                <span>{item.description}</span>
                <span>{item.character}</span>
            </div>
            <Switch
                disabled={!contains(item.id, this.props.selectArray) && this.props.selectArray.length >= this.props.maxSelect}
                value={contains(item.id, this.props.selectArray)}
                onClick={() => this.handleClickRow(item.id)} />
        </div>
    );

    render() {
        const { list, maxSelect, title, selectArray, translate: t } = this.props;

        return (

            <div className={styles.wrapper}>
                <div className={styles.headerRow}>
                    <span>
                        {title}
                        </span>
                    <span>
                     Выбрано {selectArray.length} из {maxSelect}
                     </span>
                </div>
                <div>
                    {
                        map((item) => {
                            return this.renderRowList(item);
                        }, list)
                    }
                </div>
                {
                    list.length === 0 && (
                        <div className={styles.wrapperSearchContentEmpty}>
                            {t('settings.notFound')}
                        </div>
                    )
                }
            </div>
        );
    }
}