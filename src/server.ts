import express from 'express';
import router from './router';
import morgan from 'morgan';

const app = express();

app.use('/api', router);

export default app;