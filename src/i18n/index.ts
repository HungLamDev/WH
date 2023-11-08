import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation_VN from './VN.json';
import translation_EN from './EN.json';
import translation_TW from './TW.json';
import translation_MM from './MM.json';
import { getAppLang } from '../utils/localStorage';


const resources = {
  EN: {
    all: translation_EN,
  },
  VN: {
    all: translation_VN,
  },
  TW: {
    all: translation_TW,
  },
  MM: {
    all: translation_MM,
  },
}

const appLang = getAppLang();
const defaultNS= 'all';
const lngDefault = appLang ? appLang : 'VN';


i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: lngDefault,
    ns:['all'],
    fallbackLng: lngDefault,
    defaultNS,
    interpolation: {
      escapeValue: false
    }
  });


export default i18n;