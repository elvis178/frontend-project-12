import { useTranslation } from 'react-i18next'
import { object, string, ref } from 'yup'

export const useLanguage = () => {
  const { i18n } = useTranslation()
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }
  return { changeLanguage }
}

const createLoginValidator = t => object().shape({
  username: string()
    .trim()
    .min(3, t('modal.schema.minMax'))
    .max(20, t('modal.schema.minMax'))
    .required(t('modal.schema.required')),
  password: string()
    .required(t('modal.schema.required'))
    .min(6, t('signUpForm.minSymbolForPassword')),
  confirmPassword: string()
    .required(t('modal.schema.required'))
    .oneOf([ref('password')], t('signUpForm.oneOfPassword')),
})

export const channelValidator = (t, channelsName) => object({
  name: string()
    .trim()
    .required(t('modal.schema.required'))
    .min(3, t('modal.schema.minMax'))
    .max(20, t('modal.schema.minMax'))
    .notOneOf(channelsName, t('modal.schema.notOneOf')),
})

export default createLoginValidator
