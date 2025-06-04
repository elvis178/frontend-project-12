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

const App = () => {
  const { changeLanguage } = useLanguage();

  const PrivateRoute = ({ children }) => {
    const { loggedIn } = useAuth();
    return loggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative'
      }}>
        <AuthProvider>
          <Header />
          
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            padding: '2rem 0'
          }}>
            <Routes>
              <Route
                path={routes.main()}
                element={
                  <div style={{ width: '100%' }}>
                    <PrivateRoute>
                      <MainPage />
                    </PrivateRoute>
                  </div>
                }
              />
              <Route path={routes.login()} element={<LoginPage />} />
              <Route path={routes.signUp()} element={<SignUpPage />} />
              <Route path={routes.notFound()} element={<ErrorPage />} />
            </Routes>
          </div>

          <div style={{ 
            position: 'fixed',
            bottom: '20px',
            right: '20px'
          }}>
            <button 
              type="button" 
              onClick={() => changeLanguage('ru')}
              style={{ marginRight: '10px' }}
            >
              ru
            </button>
            <button 
              type="button" 
              onClick={() => changeLanguage('en')}
            >
              en
            </button>
          </div>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;