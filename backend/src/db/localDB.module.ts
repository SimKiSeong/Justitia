import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { localDBConfig } from './db.config';

// NODE_ENV 가 따로 설정되어 있지 않은 경우, 테스트 DB 환경을 가르킴
const currDBConfig: TypeOrmModuleOptions = localDBConfig;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...currDBConfig,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    }),
  ],
})
export class LocalDBModule {}
