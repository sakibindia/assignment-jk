// data-source.ts
import 'dotenv/config';
import { User } from 'src/users/entities/users.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST || 'localhost',
  port: Number(process.env.PG_PORT) || 5432,
  username: process.env.PG_USERNAME || 'postgres',
  password: process.env.PG_PASS || 'neo123',
  database: process.env.PG_DB || 'neotech',
  entities: ['src/**/*.entity.{ts,js}'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Must be false in production when using migrations
  logging: true,
});
