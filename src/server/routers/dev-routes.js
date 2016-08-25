import dev from '../controllers/dev';

export default function devRoutes(app) {
  app.get('/windows/:windowId', dev.windows);
  app.get('/layout', dev.layout);
}
