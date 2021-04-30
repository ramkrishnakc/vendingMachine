import config from '../config';
import product from '../controller/product';

const {
  logger,
  app: {indexHtmlPath},
} = config;

const routes = (app) => {
  // Register route
  app.use('/vendorapi/products', product);

  app.use((req, res, next) => {
    logger.info(
      'HOST :: ',
      req.headers.host,
      ' URL :: ',
      req.url,
      'Is request secure :::',
      req.secure
    );
    return next();
    // return req.secure ? next() : res.redirect('https://' + req.headers.host + req.url);
  });

  // default page
  app.get('*', (req, res) => res.sendFile(indexHtmlPath));
};

export default routes;
