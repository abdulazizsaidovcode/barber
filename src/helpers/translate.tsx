import { useTranslation } from 'react-i18next';

export const getTranslatedText = (key: string) => {
    const { t } = useTranslation();
    return t(key);
};
