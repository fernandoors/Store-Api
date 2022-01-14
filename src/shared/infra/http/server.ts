import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import { pagination } from 'typeorm-pagination';
import '@shared/container';
import { errors as celebrateErrors } from 'celebrate';
import cors from 'cors';
import routes from './routes';
import errors from '@shared/middlewares/errors';
import '@shared/infra/typeorm';
import uploadSettings from '@config/upload';
import rateLimiter from '@shared/middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use(pagination);

app.use('/files', express.static(uploadSettings.directory));

app.use(routes);

app.use(celebrateErrors());
app.use(errors);

app.listen(3333, () => {
  console.log('Server is running on port 3333!');
});
