import common from '../controllers/common';

export default function commonRoutes(app) {
  app.get('/', common.index);
}
