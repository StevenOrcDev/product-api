import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from './middlewares';
import { logger } from './utils/logger';
import { initializeDB } from './config';

// Charger les variables d'environnement
dotenv.config();

initializeDB();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares globaux
app.use(helmet()); // Sécuriser les headers HTTP
app.use(cors()); // Autoriser les requêtes cross-origin
app.use(express.json()); // Parser le corps des requêtes JSON

// Middleware global de gestion des erreurs
app.use(errorHandler);

// Démarrage du serveur
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
