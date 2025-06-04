import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return { changeLanguage };
};

export const channelValidator = (t, channelsNames) => Yup.object().shape({
  name: Yup.string()
    .required(t('modal.schema.required'))
    .min(3, t('modal.schema.minMax'))
    .max(20, t('modal.schema.minMax'))
    .notOneOf(channelsNames, t('modal.schema.notOneOf')),
});

const createLoginValidator = (t) => {
  return Yup.object().shape({
    username: Yup.string()
      .transform(value => value?.trim())
      .min(3, t('modal.schema.minMax'))
      .max(20, t('modal.schema.minMax'))
      .required(t('modal.schema.required')),

    password: Yup.string()
      .min(6, t('signUpForm.minSymbolForPassword'))
      .required(t('modal.schema.required')),
      
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('signUpForm.passwordsMustMatch'))
      .required(t('modal.schema.required'))
  });
};

export default createLoginValidator;