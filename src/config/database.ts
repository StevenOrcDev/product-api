import { DataSource } from 'typeorm';
import { Product } from '../entities/Product';
import dotenv from 'dotenv';

dotenv.config(); // Charger les variables d'environnement

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'productdb',
  entities: [Product],
  synchronize: true, // Utilisé pour synchroniser la base de données avec les entités. Désactive en production
  logging: true,
});

// Initialiser la connexion
export const initializeDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');
  } catch (error) {
    console.error('Error connecting to the database', error);
    process.exit(1); // Arrête l'application en cas d'échec de la connexion
  }
};
