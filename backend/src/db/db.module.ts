import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql' as const,
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USER', 'n_grm'),
        password: configService.get<string>('DB_PASSWORD', 'password'),
        database: configService.get<string>('DB_NAME', 'n_grm'),
        synchronize: false,
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
          __dirname + '/../**/**/*.entity{.ts,.js}',
        ],
        migrations: [__dirname + '/./migrations/**/*{.ts,.js}'],
        migrationsTableName: 'migrations',
        extra: {
          connectionLimit: 30,
          connectTimeout: 10000,
          idleTimeout: 10000,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DBModule {}
