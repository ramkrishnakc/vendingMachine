import path from 'path';

const rootPath = path.normalize(`${__dirname}/../../`);
const publicPath = path.join(rootPath, 'dist');
const serverPath = path.join(rootPath, 'server');
const indexHtmlPath = path.join(publicPath, 'index.html');

const certDirectory =
  process.env.CERTIFICATE_LOCATION || path.join(serverPath, 'certs');
const logDirectory =
  process.env.LOGFILE_LOCATION || path.join(rootPath, 'logs');
const schemaDirectory = path.join(serverPath, 'schema');
const dbName =
  process.env.NODE_ENV === 'test' ? 'vendorMachine-test' : 'vendorMachine';

export default {
  rootPath,
  publicPath,
  indexHtmlPath,
  certDirectory,
  logDirectory,
  schemaDirectory,
  dbName,
  uploadPaths: [
    path.join(rootPath, 'uploads', 'products'),
    path.join(publicPath, 'uploads', 'products'),
  ],
};
