export const environment = {
  production: false,
  gatewayUrl: 'https://gw.sat.imisight.net',
  auth0: {
    domain: 'imisight-sat.auth0.com',
    clientId: 'KXLTbs08LtLqrbPwSgn7Ioej0aMB7tf6',
    audience: 'https://gw.sat.imisight.net',
    redirect: 'http://localhost:4200/callback',
    home: 'http://localhost:4200',
    scope: 'openid profile'
  },
  info: {
    token: '334466'
  }
};
