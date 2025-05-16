import * as Yup from 'yup';

const createLoginValidator = () => {
  return Yup.object().shape({
    username: Yup.string()
      .transform(value => value?.trim())
      .min(3, 'errors.usernameTooShort')
      .max(20, 'errors.usernameTooLong')
      .required('errors.requiredField'),

    password: Yup.string()
      .min(6, 'errors.passwordTooShort')
      .required('errors.requiredField')
  })
}

export default createLoginValidator;