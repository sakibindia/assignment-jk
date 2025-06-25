// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/users.entity';
import { LoggerService } from '../common/logger/logger.service';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersSeeder } from './seeders/users.seeders';
import { UsersResolver } from './user.resolver';

/**
 * UsersModule is responsible for handling user-related operations,
 * including user creation, retrieval, and seeding admin users.
 * It imports TypeORM for database interaction and CacheModule for caching.
 */
@Module({
  imports: [
    /**
     * Registers the User entity with TypeORM to allow database operations.
     * This enables the use of User repository in UsersService and UsersSeeder.
     */
    TypeOrmModule.forFeature([User]),

    /**
     * Registers CacheModule to manage caching operations.
     * This can be used to optimize user data retrieval.
     */
    CacheModule.register(),
  ],
  controllers: [UsersController], // Registers UsersController for handling HTTP requests.
  providers: [
    UsersService,  // Provides business logic for user-related operations.
    LoggerService, // Custom logger service for logging application events.
    UsersSeeder,   // Seeder for creating initial admin user data.
    UsersResolver,
  ],
  exports: [
    UsersService, // Exports UsersService to be used in other modules.
    UsersSeeder   // Exports UsersSeeder for potential use in global seeding.
  ],
})
export class UsersModule {}
