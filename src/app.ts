import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();

// Routes
import gamesRouter from './routes/gamesRoutes';
import userRouter from './routes/userRouter';
import favoriteRouter from './routes/favoriteRouter';

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
    this.app.use(userRouter);
    this.app.use(favoriteRouter);
    this.app.use(gamesRouter);
  }
}

export default new App().app;