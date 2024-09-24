import { DataSource } from 'typeorm';
import { Product } from '../entities/Product';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'test') {
  dotenv.config();
}

export const AppDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Product], // Your entities here
  synchronize: true, // Crée automatiquement les tables si elles n'existent pas
  logging: false,
});
