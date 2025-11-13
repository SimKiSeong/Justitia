import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'process';

console.log(process.env.DB_HOST);

const dBConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  username: process.env.DB_USER || 'n_grm',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'n_grm',
  //logging: ['staging', 'development'].includes(process.env.DB_ENV),
  synchronize: false,
  extra: {
    connectionLimit: 30,
    connectTimeout: 10000,
    acquireTimeout: 10000,
    idleTimeout: 10000,
  },
};

// for testing app module
const localDBConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  username: process.env.DB_USER || 'n_grm',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'n_grm',
  //logging: ['staging', 'development'].includes(process.env.DB_ENV),
  synchronize: false,
  extra: { connectionLimit: 10 }, // default: 10
};

export { dBConfig, localDBConfig };
