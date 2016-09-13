import 'babel-polyfill';

import express from 'express';

import commonRoutes from './routers/common-routes';
import errorHandler from './middlewares/error-handler';
import favicon from 'serve-favicon';

const app = express();
const {NODE_ENV} = process.env;

app.use(favicon('src/assets/images/favicon.ico'));
app.use(express.static('public'));
app.use(express.static('src/assets'));

commonRoutes(app);

// Inject Error Handling middleware
app.use(errorHandler);

app.listen(8000, () => console.log('Listening on Port 8000...'));
