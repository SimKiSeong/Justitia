import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dBConfig } from './db.config';

// NODE_ENV가 따로 설정되어 있지 않은 경우, 테스트 DB 환경을 가르킴
const currDBConfig: TypeOrmModuleOptions = dBConfig;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...currDBConfig,
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
        __dirname + '/../**/**/*.entity{.ts,.js}',
      ],
      migrations: [__dirname + '/./migrations/**/*{.ts,.js}'],
      migrationsTableName: 'migrations',
    }),
  ],
})
export class DBModule {}
