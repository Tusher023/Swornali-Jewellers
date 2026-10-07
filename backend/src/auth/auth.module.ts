import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '../prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';

@Global()
@Module({
  imports: [
    JwtModule.register({}),
  ],

  controllers: [
    AuthController,
  ],

  providers: [
    AuthService,
    PrismaService,
    JwtAuthGuard,
  ],

  exports: [
    JwtModule,
    JwtAuthGuard,
  ],
})
export class AuthModule {}