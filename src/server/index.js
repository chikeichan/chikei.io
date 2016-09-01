import 'babel-polyfill';

import express from 'express';

import commonRoutes from './routers/common-routes';
import devRoutes from './routers/dev-routes';

const app = express();
const {NODE_ENV} = process.env;

app.use(express.static('public'));
app.use(express.static('src/assets'));

commonRoutes(app);

// if (NODE_ENV === 'development') {
//   devRoutes(app);
// }

app.listen(8000, () => console.log('Listening on Port 8000...'));
