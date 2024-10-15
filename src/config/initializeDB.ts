import { logger } from '../utils';
import { AppDataSource } from './database';

export const initializeDB = async () => {
  try {
    await AppDataSource.initialize();
    logger.info('Database connection established');
  } catch (error) {
    logger.error(error);
    process.exit(1); // Arrête l'application en cas d'échec de la connexion
  }
};

// requete psql lister les tables
// \dt
// req pour voir le schema de la table
// \d nom_table
// Select name from product;
// select * from product;
