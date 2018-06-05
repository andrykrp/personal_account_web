import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Translate from '../../../decorators/Translate';

import { formatWalletNumber } from '../../../../utils/format';

import styles from './Menu.pcss';

@Translate()
export default class Menu extends PureComponent {
    static propTypes = {
        onClickEmptySpace: PropTypes.func,
        user: PropTypes.number
    };

    static defaultProps = {};

    render() {
        const { translate: t, user } = this.props;

        return (

            <div className={styles.wrapper}>
                <div className={styles.panel}>
                    <div className={styles.header}>
                        <div className={styles.userAvatar}>
                            <img src='/img/menu/avatar.svg' alt='' className={styles.userAvatar} />
                        </div>
                        <div className={styles.userName}>{formatWalletNumber(user)}</div>
                    </div>
                    <div className={styles.itemMenuInverted}>
                        <img src='/img/menu/add.svg' alt='' className={styles.itemMenuIcon} />
                        <div className={styles.itemMenuTitle}>{t('menu.addAdvert')}</div>
                    </div>
                    <div className={styles.itemMenu}>
                        <img src='/img/menu/search.svg' alt='' className={styles.itemMenuIcon} />
                        <div className={styles.itemMenuTitle}>{t('menu.search')}</div>
                    </div>
                    <div className={styles.itemMenu}>
                        <img src='/img/menu/savedSearch.svg' alt='' className={styles.itemMenuIcon} />
                        <div className={styles.itemMenuTitle}>{t('menu.savedSearches')}</div>
                        <div className={styles.badge}>3</div>
                    </div>
                    <div className={styles.itemMenu}>
                        <img src='/img/menu/star.svg' alt='' className={styles.itemMenuIcon} />
                        <div className={styles.itemMenuTitle}>{t('menu.favorites')}</div>
                        <div className={styles.badge}>33</div>
                    </div>
                    <div className={styles.itemMenu}>
                        <img src='/img/menu/bell.svg' alt='' className={styles.itemMenuIcon} />
                        <div className={styles.itemMenuTitle}>{t('menu.notifications')}</div>
                    </div>
                    <div className={styles.itemMenu}>
                        <img src='/img/menu/sticker.svg' className={styles.itemMenuIcon} />
                        <div className={styles.itemMenuTitle}>{t('menu.mySales')}</div>
                    </div>
                    <div className={styles.itemMenu}>
                        <img src='/img/menu/message.svg' alt='' className={styles.itemMenuIcon} />
                        <div className={styles.itemMenuTitle}>{t('menu.messages')}</div>
                        <div className={styles.badge}>
                            <div className={styles.blueBadge}>30</div>
                        </div>
                    </div>
                    <div className={styles.itemMenu}>
                        <img src='/img/menu/settings.svg' alt='' className={styles.itemMenuIcon} />
                        <div className={styles.itemMenuTitle}>{t('menu.settings')}</div>
                    </div>
                </div>
                <div className={styles.rightSpace} onClick={this.props.onClickEmptySpace}/>
            </div>
        );
    }
}