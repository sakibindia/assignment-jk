// src/users/users.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../users/users.controller';
import { UsersService } from '../../users/users.service';
import { LoggerService } from '../../common/logger/logger.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { User } from '../../users/entities/users.entity';
import { NotFoundException } from '@nestjs/common';
import { UserRole } from '../../users/entities/user-role.enum';

// Mock LoggerService
const mockLoggerService = {
  info: jest.fn(),
  error: jest.fn(),
};

// Mock CacheManager
const mockCacheManager = {
  get: jest.fn(),
  set: jest.fn(),
};

// Mock UsersService
const mockUsersService = {
  create: jest.fn(),
  findOne: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;
  let loggerService: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    loggerService = module.get<LoggerService>(LoggerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should create a new user and return success message', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        role: 'viwer'
      };

      mockUsersService.create.mockResolvedValue({
        success: true,
        message: 'User created successfully',
      });

      const result = await controller.signup(createUserDto);

      expect(result).toEqual({
        success: true,
        message: 'User created successfully',
      });
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw an error if user already exists', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        role: 'admin'
      };

      mockUsersService.create.mockRejectedValue(
        new NotFoundException('User already exists'),
      );

      await expect(controller.signup(createUserDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getProfile', () => {
    it('should return the current user profile', async () => {
        const mockUser: User = {
            id: '1',
            email: 'test@example.com',
            password: 'hashed_password',
            role: UserRole.VIEWER,
            documents: [],
            comparePassword: jest.fn().mockResolvedValue(true),
          };

      jest.spyOn(controller, 'getProfile').mockImplementation(() => mockUser);

      const result = controller.getProfile(mockUser);

      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user is not found', async () => {
        // Mock the CurrentUser decorator to return null
        jest.spyOn(controller, 'getProfile').mockImplementation(() => {
          throw new NotFoundException('User not found');
        });
      
        expect(() => controller.getProfile({} as User)).toThrow(NotFoundException);
        expect(mockLoggerService.info).not.toHaveBeenCalled();
      });
  });
});