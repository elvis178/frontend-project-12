import routes from '../../routes.js';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>404 - Страница не найдена</h1>
      <p>
        Вы можете перейти {' '}
        <a href={routes.homePath()}>на главную страницу</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
