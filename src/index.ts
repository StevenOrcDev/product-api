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

// Helmet sécurise les en-têtes HTTP en configurant de manière appropriée des en-têtes HTTP
// par exemple, en configurant X-Content-Type-Options pour empêcher les navigateurs de faire du MIME sniffing
// ou en configurant X-Frame-Options pour empêcher le clickjacking
// ou en configurant X-XSS-Protection pour activer le filtre de script intersite (XSS) intégré des navigateurs
app.use(helmet());
// Cors permet de sécuriser les requêtes HTTP en définissant les domaines autorisés à accéder à l'API
app.use(cors());
app.use(express.json());

// initialize routes with versions
app.use('/api/v1/products', productRoutes);

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
