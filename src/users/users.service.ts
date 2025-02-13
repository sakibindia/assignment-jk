import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'

@Injectable()
export class UsersService {
  constructor(
    @Inject(CACHE_MANAGER)
      private cacheManager: Cache,
    @InjectRepository(User)
      private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<{ success: boolean; message: string }> {
    const { email, password } = createUserDto;
  
    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.FOUND); // 302 status
    }
  
    // Hash the password
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
  

  async findOne(email: string): Promise<any | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

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