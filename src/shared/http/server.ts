import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import { pagination } from 'typeorm-pagination';
import { errors as celebrateErrors } from 'celebrate';
import cors from 'cors';
import routes from './routes';
import errors from '@shared/middlewares/errors';
import '@shared/typeorm';
import uploadSettings from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use(pagination);

app.use('/files', express.static(uploadSettings.directory));

app.use(routes);

app.use(celebrateErrors());
app.use(errors);

app.listen(3333, () => {
  console.log('Server is running on port 3333!');
});
