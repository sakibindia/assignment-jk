import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && await user.comparePassword(password)) {
      const { password, ...result } = user; // Remove password from the result
      return result;
    }
    return null;
  }

  async login(user: any) {
    const loggedUser = await this.validateUser(user.email, user.password)
    if(!loggedUser) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { email: loggedUser.email, id: loggedUser.id, role: loggedUser.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}