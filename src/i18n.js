//shoutout https://www.youtube.com/watch?v=r5uDYl6NnkY
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'

import fi from './locales/finnish.json'
import en from './locales/english.json'

i18n.use(initReactI18next).init({
    resources: {
        fi: {translation: fi},
        en: {translation: en}
    },
    fallbackLng: 'fi',
    interpolation: {
        escapeValue:false
    }
})

export default i18n;