import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/Header.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import MainPage from './pages/MainPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUp from './pages/SignUpPage.jsx';
import router from './routes.js';
import AuthProvider, { PrivateRoute } from './context/AuthProvider.jsx';

const App = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
    >
      <div className="d-flex h-100 flex-column">
        <AuthProvider>
          <Header />
          <Routes>
            <Route
              path={router.homePath()}
              element={(
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              )}
            />
            <Route path={router.loginPagePath()} element={<LoginPage />} />
            <Route path={router.signupApiPath()} element={<SignUp />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => changeLanguage('ru')}>ru</button>
            <button type="button" onClick={() => changeLanguage('en')}>en</button>
          </div>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;