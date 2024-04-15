import express from 'express';
import './shared/utils/yupTranslations';
import { router } from './routes';

const server = express();

server.use(express.json());

server.use(router);

export { server };
