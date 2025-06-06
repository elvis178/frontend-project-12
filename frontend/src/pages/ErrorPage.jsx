/* eslint-disable @stylistic/semi */
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import page404 from '../assets/page-404.svg';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        src={page404}
        alt={t('pageNotFound')}
        className="img-fluid h-25"
      />
      <h1 className="h4 text-muted">{t('errors.pageNotFound')}</h1>
      <p className="text-muted">
        {t('redirect')}
        {' '}
        <Link to="/">{t('redirectOnMainPage')}</Link>
      </p>
    </div>
  );
};
export default ErrorPage;
