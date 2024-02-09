export default {
  meEndpoint: '/api/auth/verify-token',
  loginEndpoint: '/api/auth/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'token',
  onTokenExpiration: 'logout' // logout | refreshToken
}
