import { logger } from '../utils';
import { AppDataSource } from './database';

export const initializeDB = async () => {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    logger.error(error);
    process.exit(1); // Arrête l'application en cas d'échec de la connexion
  }
};
