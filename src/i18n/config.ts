import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import nlTrans from './locales/nl/translation.json';
import enTrans from './locales/en/translation.json';

const resources = {
  en: {
    translation: enTrans
  },
  nl: {
    translation: nlTrans
  }
};

const savedLanguage = localStorage.getItem('appLanguage') || 'nl';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
