import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.jsx';
import MainPage from './pages/MainPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import SignUp from './pages/SignUpPage.jsx';
import routes from './routes';
import useAuth from './hooks/index.jsx';
import './index.css';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.user ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <Header />
      <Routes>
        <Route path={routes.root()} errorElement={<ErrorPage />}>
          <Route
            index
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            )}
          />
          <Route path={routes.login()} element={<LoginPage />} />
          <Route path={routes.signup()} element={<SignUp />} />
          <Route path={routes.notFound()} element={<ErrorPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  </Router>
);

export default App;