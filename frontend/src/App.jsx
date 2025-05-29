import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import routes from './routes';
import LoginPage from './components/Pages/LoginPage';
import NotFoundPage from './components/Pages/NotFoundPage';
import useAuth from './hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.user ? children : <Navigate to={routes.loginPagePath()} />;
};

const App = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Проверка токена при загрузке приложения
    if (auth.user?.token) {

      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [auth.user]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Главная страница */}
        <Route
          path={routes.homePath()}
          element={
            <PrivateRoute>
              <div>Главная страница чата</div>
            </PrivateRoute>
          }
        />
        
        {/* Страница входа */}
        <Route
          path={routes.loginPagePath()}
          element={
            auth.user ? (
              <Navigate to={routes.homePath()} />
            ) : (
              <LoginPage />
            )
          }
        />
        
        {/* Страница 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;

