import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from './middlewares';
import { logger } from './utils/logger';
import { initializeDB } from './config';
import { productRoutes } from './routes';

dotenv.config();

initializeDB();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(helmet()); // secure HTTP headers
app.use(cors()); // allow cross-origin requests
app.use(express.json());

// initialize routes with versions
app.use('/api/v1/products', productRoutes);

// Global middleware handling errors
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
