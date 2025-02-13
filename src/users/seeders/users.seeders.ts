// src/users/users.seeder.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../entities/user-role.enum';

@Injectable()
export class UsersSeeder {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async seedAdminUser() {
    const adminExists = await this.userRepository.findOne({ where: { email: 'admin@jktech.com' } });
    if (!adminExists) {
      const adminUser = this.userRepository.create({
        email: 'admin@jktech.com',
        password: await bcrypt.hash('admin123', 10), // Hash the password
        role: UserRole.ADMIN, // Assign admin role
      });
      await this.userRepository.save(adminUser);
      console.log('Admin user seeded successfully!');
    }
  }
}