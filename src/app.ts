import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();

// Routes
import gamesRouter from './routes/gamesRoutes';

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.configs();
    this.routes();
  }

  configs() {
    this.app.use(helmet());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(gamesRouter);
  }
}

export default new App().app;