import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';
import LoginPage from './components/Pages/LoginPage';
import NotFoundPage from './components/Pages/NotFoundPage';

const App = () => (
  <Router>
    <Routes>
      {/* Главная страница */}
      <Route 
        path={routes.homePath()} 
        element={<div>Главная страница чата</div>} 
      />
      
      {/* Страница входа */}
      <Route 
        path={routes.loginPagePath()} 
        element={<LoginPage />} 
      />
      
      {/* Страница 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default App;

