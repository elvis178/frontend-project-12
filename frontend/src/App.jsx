import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import useAuth from './hooks/index.jsx';
import { useLanguage } from './utils.js';
import Header from './components/Header.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import MainPage from './pages/MainPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import routes from './routes.js';
import AuthProvider from './context/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const { changeLanguage } = useLanguage();

  const PrivateRoute = ({ children }) => {
    const { loggedIn } = useAuth();
    return loggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <div className="d-flex h-100 flex-column">
        <AuthProvider>
          <Header />
          <Routes>
            <Route
              path={routes.main()}
              element={(
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              )}
            />
            <Route path={routes.login()} element={<LoginPage />} />
            <Route path={routes.signUp()} element={<SignUpPage />} />
            <Route path={routes.notFound()} element={<ErrorPage />} />
          </Routes>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="button" style={{ border: '2px solid #0d6efd', marginRight: '10px', padding: '5px 10px', borderRadius: '4px' }} onClick={() => changeLanguage('ru')}>ru</button>
            <button type="button" style={{ border: '2px solid #0d6efd', padding: '5px 10px', borderRadius: '4px' }} onClick={() => changeLanguage('en')}>en</button>
          </div>
          <ToastContainer />
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;
