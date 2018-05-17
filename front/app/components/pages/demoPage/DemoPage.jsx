import React from 'react';
import { I18n  } from 'react-i18next';

import styles from './DemoPage.pcss';

export default props => (
    <I18n ns="translations">
        {
            (t) => (
                <div className={styles.wrapper}>{t('description.part1')}</div>
            )}
    </I18n>
);
