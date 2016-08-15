import dev from '../controllers/dev';

export default function devRoutes(app) {
  app.get('/layout', dev.layout);
}
