import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Cache } from 'cache-manager';
export declare class UsersService {
    private cacheManager;
    private usersRepository;
    constructor(cacheManager: Cache, usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<{
        success: boolean;
        message: string;
    }>;
    findOne(email: string): Promise<User | undefined | any>;
}
