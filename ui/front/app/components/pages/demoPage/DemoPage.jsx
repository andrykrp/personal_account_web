import React from 'react';
import { I18n } from 'react-i18next';

import styles from './DemoPage.pcss';

export default props => (
    <I18n ns="translations">
        {
            (t) => (
                <div className={styles.wrapper}>
                    <div className={styles.wrapperHexagon}>
                        <img className={styles.hex} src="/img/hex.svg" alt="" />
                    </div>
                    <div className={styles.wrapperText}>
                        <h2 className={styles.header}>
                            {t('demoPage.header')}
                        </h2>
                        <p className={styles.smallText}>{t('demoPage.desc')}</p>
                    </div>
                    <div className={styles.imgWrapper}>
                        <img className={styles.img} src="/img/in_developing.svg" alt="" />
                    </div>
                </div>
            )}
    </I18n>
);
