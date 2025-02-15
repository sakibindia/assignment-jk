// src/users/users.service.ts
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

/**
 * UsersService handles all user-related business logic, 
 * including user creation, retrieval, and caching.
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Injects the Cache Manager to manage caching operations,
     * optimizing data retrieval and reducing database load.
     */
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,

    /**
     * Injects the User repository to perform database operations
     * like creating and fetching user records.
     */
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user by hashing the password and saving the record to the database.
   * Checks for existing users before creation to avoid duplicates.
   * 
   * @param createUserDto - The data required to create a new user (email, password)
   * @returns An object indicating success and a message
   * @throws HttpException if the user already exists
   */
  async create(createUserDto: CreateUserDto): Promise<{ success: boolean; message: string }> {
    const { email, password } = createUserDto;

    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      // 302 status for user already exists
      throw new HttpException('User already exists', HttpStatus.FOUND); 
    }

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the user
    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
    });
    await this.usersRepository.save(user);

    return {
      success: true,
      message: 'User created successfully',
    };
  }

  /**
   * Finds a user by email from the database.
   * This method is used for user authentication and validation.
   * 
   * @param email - The email of the user to find
   * @returns The user object or undefined if not found
   */
  async findOne(email: string): Promise<User | undefined | any> {
    return this.usersRepository.findOne({ where: { email } });
  }

  /**
   * Example method for fetching user data by ID with caching.
   * Uncomment to use.
   * 
   * @param userId - The ID of the user to retrieve
   * @returns The user object from cache or database
   */
  // async getUserById(userId: number) {
  //   const cacheKey = `user_${userId}`;

  //   // 1️⃣ Try fetching data from the cache
  //   const cachedUser = await this.cacheManager.get<User>(cacheKey);
  //   if (cachedUser) {
  //     console.log(`🔵 Data fetched from CACHE for user: ${userId}`);
  //     return cachedUser; // Return cached data
  //   }

  //   // 2️⃣ If not in cache, fetch from the database
  //   console.log(`🟡 Data fetched from DATABASE for user: ${userId}`);
  //   const user = await this.usersRepository.findOne({ where: { id: userId } });

  //   if (user) {
  //     // 3️⃣ Store the result in the cache for next time
  //     await this.cacheManager.set(cacheKey, user, 6000); // Cache for 60 seconds
  //   }

  //   return user;
  // }
}
