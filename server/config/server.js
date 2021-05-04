/* Server configurations */
const getServerDetails = (httpPort, httpsPort, ip) => ({
  httpPort: process.env.HTTP_PORT || httpPort,
  httpsPort: process.env.HTTPS_PORT || httpsPort,
  ip: process.env.IP || ip,
});

export default {
  development: getServerDetails('8000', '8443', '0.0.0.0'),
  production: getServerDetails('8000', '8443', '0.0.0.0'),
  test: getServerDetails('8005', '8445', '0.0.0.0'),
};
