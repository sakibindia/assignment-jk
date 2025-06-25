// src/users/users.seeder.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../entities/user-role.enum';

@Injectable()
export class UsersSeeder {
  /**
   * Constructor to inject the User repository.
   * 
   * @param userRepository - Repository for the User entity.
   */
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Seeds the database with an admin user if it doesn't already exist.
   * 
   * This function checks if an admin user with the email 'admin@jktech.com'
   * already exists. If not, it creates a new admin user with a hashed password
   * and the role set to ADMIN.
   * 
   * @returns A promise that resolves when the seeding is complete.
   */
  async seedAdminUser(): Promise<void> {
    // Check if the admin user already exists
    const adminExists = await this.userRepository.findOne({ 
      where: { email: 'admin@neotech.com' } 
    });

    // If the admin doesn't exist, create and save the admin user
    if (!adminExists) {
      const adminUser = this.userRepository.create({
        email: 'admin@neotech.com',
        password: await bcrypt.hash('admin123', 10), // Hash the password
        role: UserRole.ADMIN, // Assign admin role
      });
      await this.userRepository.save(adminUser);
      console.log('Admin user seeded successfully!');
    }
  }
}
