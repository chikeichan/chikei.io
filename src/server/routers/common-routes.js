import common from '../controllers/common';
import layout from '../controllers/layout';
import windows from '../controllers/windows';
import blogs from '../controllers/blogs';

export default function commonRoutes(app) {
  app.get('/layout', layout.getLayout);
  app.get('/windows/:windowId', windows.getWindow);
  app.get('/tutorials/:filename', blogs.getBlog);
  app.get('/', common.index);
}
