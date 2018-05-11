import React from 'react';
import { I18n  } from 'react-i18next';

export default props => (
    <I18n ns="translations">
        {
            (t) => (
                <div>{t('description.part1')}</div>
            )}
    </I18n>
);
