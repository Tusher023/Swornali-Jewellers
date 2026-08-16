import { Body, Controller, Post } from '@nestjs/common';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { AuthService } from './auth.service';
class RegisterDto { @IsEmail() email!: string; @IsString() @MinLength(8) password!: string; @IsString() firstName!: string; @IsString() lastName!: string; }
class LoginDto { @IsEmail() email!: string; @IsString() @MinLength(8) password!: string; }
class RefreshDto { @IsString() refreshToken!: string; }
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Post('register') register(@Body() dto: RegisterDto) { return this.auth.register(dto); }
  @Post('login') login(@Body() dto: LoginDto) { return this.auth.login(dto); }
  @Post('refresh') refresh(@Body() dto: RefreshDto) { return this.auth.refresh(dto.refreshToken); }
}
