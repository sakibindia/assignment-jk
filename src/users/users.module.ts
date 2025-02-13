import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/users.entity';
import { LoggerService } from '../common/logger/logger.service';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersSeeder } from './seeders/users.seeders';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CacheModule.register(),
  ], // Register the User entity
  controllers: [UsersController],
  providers: [UsersService, LoggerService, UsersSeeder],
  exports: [UsersService, UsersSeeder]
})
export class UsersModule { }
