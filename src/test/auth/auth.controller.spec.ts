// auth/auth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../auth/auth.controller';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../users/entities/users.entity';
import * as bcrypt from 'bcrypt';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: await bcrypt.hash('valid_password', 10), // Hash the password
      comparePassword: jest.fn().mockImplementation(async (password: string) => {
        return bcrypt.compare(password, mockUser.password);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('fake-jwt-token'),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return access token for valid credentials', async () => {
      const result = await controller.login({
        email: 'test@example.com',
        password: 'valid_password',
      });
      expect(result).toHaveProperty('access_token');
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

      await expect(
        controller.login({
          email: 'test@example.com',
          password: 'wrong_password',
        }),
      ).rejects.toThrow('Invalid email or password');
    });
  });
});