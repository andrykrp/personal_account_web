import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import EN_CONFIG from './constants/locales/en.json';
import RU_CONFIG from './constants/locales/ru.json';

i18n
    .use(reactI18nextModule)
    .init({
        fallbackLng: 'ru',
        ns: ['translations'],
        defaultNS: 'translations',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        react: {
            wait: false
        },
        resources: {
            'en': EN_CONFIG,
            'ru': RU_CONFIG

        }
    });

export default i18n;