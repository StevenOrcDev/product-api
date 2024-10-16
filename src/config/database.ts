import { DataSource } from 'typeorm';
import { Product } from '../entities/Product';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'test') {
  dotenv.config();
}

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource: DataSource = new DataSource({
  type: 'postgres',
  // En production, on utilise DATABASE_URL, sinon on garde la config locale
  url: isProduction ? process.env.DATABASE_URL : undefined,
  host: !isProduction ? process.env.DB_HOST || 'localhost' : undefined,
  port: !isProduction ? (process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432) : undefined,
  username: !isProduction ? process.env.DB_USER : undefined,
  password: !isProduction ? process.env.DB_PASSWORD : undefined,
  database: !isProduction ? process.env.DB_NAME : undefined,
  entities: [Product], // Tes entités ici
  synchronize: true, // En production, désactive `synchronize` pour éviter des modifications inattendues
  logging: false,
  extra: {
    ssl: isProduction ? { rejectUnauthorized: false } : false,
  },
});
