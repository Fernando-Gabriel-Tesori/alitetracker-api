import 'dotenv/config';
import express from 'express';

import { setupMongo } from './database';
import { routes } from './routes';
import cors from 'cors';

const app = express();

setupMongo()
  .then(() => {
    app.use(cors());
    app.use(express.json());
    app.use(routes);

    app.listen(4000, () => {
      console.log('🚀 App is running at port 4000!');
    });
  })
  .catch((err) => {
    console.error(err.menssage);
  });
