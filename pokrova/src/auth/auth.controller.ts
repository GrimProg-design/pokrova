import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(private configService: ConfigService) {}

  @Post('login')
  async login(@Body() body: any) {
    const adminUser = this.configService.get('ADMIN_USER');
    const adminPass = this.configService.get('ADMIN_PASSWORD');

    if (body.username === adminUser && body.password === adminPass) {
      return { token: 'secret-admin-key' }; 
    }
    throw new UnauthorizedException('Неверный логин или пароль');
  }
}