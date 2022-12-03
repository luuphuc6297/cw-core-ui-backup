export type Language = {
    key: string;
    dir?: 'ltr' | 'rtl';
    fontScale?: number;
};

export const DEFAULT_LANGUAGE_KEY: Language['key'] = 'en';

export const AVAILABLE_LANGUAGES: Language[] = [
    {
        key: 'en',
    },
];
