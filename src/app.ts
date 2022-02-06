import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import appRoutes from './routes/app.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.initializedRoutes();
    this.initializedDocs();
  }

  private initializedRoutes() {
    this.app.use('/api/v1', appRoutes);
  }

  private initializedDocs() {
    try {
      const swaggerDocument = require('../swagger.json');
      this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    } catch (error) {
      console.log('Unable to read swagger document.', error);
    }
  }
}

export default new App();
