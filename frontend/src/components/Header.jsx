import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Container, Navbar } from 'react-bootstrap'
import routes from '../routes.js'
import useAuth from '../hooks/index.jsx'

const Header = () => {
  const { t } = useTranslation()
  const { loggedIn, logOut } = useAuth()

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">{t('navBar.title')}</Navbar.Brand>
        {loggedIn && (
          <Link
            onClick={logOut}
            to={routes.login()}
            type="button"
            className="btn btn-primary"
          >
            {t('navBar.button')}
          </Link>
        )}
      </Container>
    </Navbar>
  );
};

export default Header
