const apiPath = '/api/v1';

const routes = {
  // API endpoints
  loginApiPath: () => [apiPath, 'login'].join('/'), 
  signupApiPath: () => [apiPath, 'signup'].join('/'),
  dataApiPath: () => [apiPath, 'data'].join('/'),
  
  // Frontend routes
  homePath: () => '/',
  loginPagePath: () => '/login',
};

export default routes;