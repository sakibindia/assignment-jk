import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
export declare class UsersSeeder {
    private userRepository;
    constructor(userRepository: Repository<User>);
    seedAdminUser(): Promise<void>;
}
