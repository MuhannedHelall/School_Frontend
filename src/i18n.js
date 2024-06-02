import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../i18n/en/translation.json';
import ar from '../i18n/ar/translation.json';

i18n.use(initReactI18next).init({
  debug: false,
  fallbackLng: 'en',
  lng: JSON.parse(localStorage.getItem('lang'))?.value,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
  },
});

export default i18n;
