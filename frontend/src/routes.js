const apiPath = '/api/v1'

export default {
  // Frontend routes
  main: () => '/',
  login: () => '/login',
  signUp: () => '/signup',
  notFound: () => '*',

  // API endpoints
  loginPath: () => [apiPath, 'login'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
}
