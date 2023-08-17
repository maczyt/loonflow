import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import type { InitOptions } from 'i18next';
import en from './en.json';
import zhCN from './zh-CN.json';

export enum Lng {
  'zhCN' = 'zhCN',
  'en' = 'en',
}
export const initLng = (lng?: Lng) => {
  return i18n.use(initReactI18next).init({
    resources: {
      [Lng.en]: {
        translation: en,
      },
      [Lng.zhCN]: {
        translation: zhCN,
      },
    },
    lng,
    fallbackLng: Lng.zhCN,
    interpolation: {
      escapeValue: false,
    },
  } as InitOptions);
};
