import dayjs from 'dayjs';
import i18n from 'i18next';
import * as locales from 'locales';
import { initReactI18next } from 'react-i18next';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE_KEY, isBrowser } from 'utils';

dayjs.locale(DEFAULT_LANGUAGE_KEY);

i18n.use(initReactI18next).init({
    defaultNS: 'common',
    ns: Object.keys((locales as ExplicitAny)[DEFAULT_LANGUAGE_KEY]),
    resources: locales,
    lng: DEFAULT_LANGUAGE_KEY,
    fallbackLng: DEFAULT_LANGUAGE_KEY,

    interpolation: {
        escapeValue: false, // react already safes from xss
    },
});

i18n.on('languageChanged', (langKey) => {
    const language = AVAILABLE_LANGUAGES.find(({ key }) => key === langKey);
    dayjs.locale(langKey);
    if (isBrowser) {
        document.documentElement.lang = langKey;
        document.documentElement.dir = language?.dir ?? 'ltr';
        document.documentElement.style.fontSize = `${(language?.fontScale ?? 1) * 100}%`;
    }
});

export default i18n;
