import { useFormik } from 'formik';
import createLoginValidator from '../../utils';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: createLoginValidator(),
    onSubmit: (values) => {
      console.log('Форма готова к отправке:', values);
    },
  });

   return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Вход</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Имя пользователя</label>
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username && (
            <div style={{ color: 'red' }}>{formik.errors.username}</div>
          )}
        </div>
        
        <div>
          <label>Пароль</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          )}
        </div>
        
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;