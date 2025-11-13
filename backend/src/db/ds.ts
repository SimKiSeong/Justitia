import { DataSource } from 'typeorm';

console.log(
  `[INFO] 마이그레이션을 위한 env 세팅 정보 : ${process.env.DB_HOST}`,
);

export const migrationDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/./migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
