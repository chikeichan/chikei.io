import common from '../controllers/common';
import layout from '../controllers/layout';
import windows from '../controllers/windows';
import blogs from '../controllers/blogs';
import codes from '../controllers/codes';

export default function commonRoutes(app) {
  app.get('/layout', layout.getLayout);
  app.get('/windows/:windowId', windows.getWindow);
  app.get('/tutorials/:filename', blogs.getBlog);
  app.get('/code-samples/:filename', codes.getCode);
  app.get('/w/:path', common.windowPath);
  app.get('/b/:path', common.blogPath);
  app.get('/', common.index);
}
