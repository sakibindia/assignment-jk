import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../users/entities/users.entity';
import { LoggerService } from '../common/logger/logger.service';
export declare class UsersController {
    private readonly usersService;
    private readonly logger;
    constructor(usersService: UsersService, logger: LoggerService);
    signup(createUserDto: CreateUserDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getProfile(user: User): User;
}
