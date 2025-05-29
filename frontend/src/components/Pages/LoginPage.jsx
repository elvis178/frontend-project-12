import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import { useAuth } from '../hooks';
import routes from '../routes';
import loginImage from '../assets/avatar.jpg';
import createLoginValidator from '../../utils';

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: createLoginValidator(),
    onSubmit: async (values) => {
      setAuthError(null);
      setIsSubmitting(true);

      try {
        const response = await axios.post(routes.apiLoginPath(), {
          username: values.username,
          password: values.password,
        });

        auth.logIn(response.data);
        navigate(routes.homePath());
      } catch (error) {
        console.error('Login error:', error);
        if (error.response?.status === 401) {
          setAuthError('Неверные имя пользователя или пароль');
          inputRef.current.select();
        } else {
          setAuthError('Ошибка сети. Попробуйте снова');
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              {/* Блок с изображением */}
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img 
                  src={loginImage} 
                  className="rounded-circle img-fluid" 
                  alt="Login" 
                  style={{ maxWidth: '200px' }}
                />
              </div>

              {/* Форма входа */}
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Вход</h1>

                {authError && (
                  <Alert variant="danger" className="text-center">
                    {authError}
                  </Alert>
                )}

                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Имя пользователя"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    ref={inputRef}
                    isInvalid={(formik.touched.username && formik.errors.username) || authError}
                    disabled={isSubmitting}
                    required
                  />
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                  {formik.touched.username && formik.errors.username && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="mb-4 form-floating">
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={(formik.touched.password && formik.errors.password) || authError}
                    disabled={isSubmitting}
                    required
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  {formik.touched.password && formik.errors.password && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Button 
                  variant="primary" 
                  className="w-100 mb-3" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Вход...' : 'Войти'}
                </Button>
              </Form>
            </Card.Body>

            <Card.Footer className="p-4 text-center">
              <span>Нет аккаунта? </span>
              <Button variant="link" onClick={() => navigate(routes.signupPagePath())}>
                Регистрация
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;