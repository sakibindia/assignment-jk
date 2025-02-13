import { Module, OnApplicationShutdown, OnModuleDestroy } from '@nestjs/common';
import * as redisStore from 'cache-manager';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerService } from './common/logger/logger.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logger.interceptors';
import { CustomExceptionFilter } from './common/exceptions/exception.filter';
import { DataSource } from 'typeorm';
import { UserSubscriber } from './users/subscribers/users.subscriber';
import { UsersSeeder } from './users/seeders/users.seeders';
import { DocumentsModule } from './documents/documents.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available across all modules
    }),
    CacheModule.registerAsync({
      useFactory: async(configService: ConfigService)=> {
        const useRedis = configService.get<boolean>('USE_REDIS'); // Read from env/config
        if (useRedis) {
          return {
            store: redisStore, // Use Redis
            host: configService.get<string>('REDIS_HOST') || 'localhost',
            port: configService.get<number>('REDIS_PORT') || 6379,
            ttl: 60, // Cache expiration in seconds
          };
        } else {
          return {
            store: 'memory', // Use in-memory caching
            ttl: 60,
            max: 100, // Maximum cache items
          };
        }
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sakib786M',
      database: 'jk-tech',
      entities:  [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true, // disable in production
      subscribers: [UserSubscriber], // Register the subscriber

    }),
    UsersModule,
    AuthModule,
    DocumentsModule
  ],
  
  providers: [
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter
    }
  ],
})
export class AppModule implements OnModuleDestroy, OnApplicationShutdown {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleDestroy() {
    if (this.dataSource.isInitialized) {
      console.log('closing db conn')
      await this.dataSource.destroy();
    }
  }

  async onApplicationShutdown() {
    if (this.dataSource.isInitialized) {
      console.log('closing db conn')
      console.log('Application is shutting down...');
      await this.dataSource.destroy();
    }
  }
}
