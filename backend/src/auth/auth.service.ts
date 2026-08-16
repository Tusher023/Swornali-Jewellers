import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma.service';

type Credentials = { email: string; password: string; firstName?: string; lastName?: string };
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}
  async register(dto: Credentials) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
    if (existing) throw new ConflictException({ success: false, message: 'Email already registered', errorCode: 'EMAIL_TAKEN' });
    const user = await this.prisma.user.create({ data: { email: dto.email.toLowerCase(), passwordHash: await argon2.hash(dto.password), firstName: dto.firstName!, lastName: dto.lastName!, cart: { create: {} }, wishlist: { create: {} } } });
    return { success: true, data: await this.issueTokens(user.id, user.role) };
  }
  async login(dto: Credentials) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
    if (!user?.isActive || !(await argon2.verify(user.passwordHash, dto.password))) throw new UnauthorizedException({ success: false, message: 'Invalid email or password', errorCode: 'INVALID_CREDENTIALS' });
    return { success: true, data: await this.issueTokens(user.id, user.role) };
  }
  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwt.verifyAsync<{ sub: string }>(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
      const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
      if (!user?.refreshTokenHash || !(await argon2.verify(user.refreshTokenHash, refreshToken))) throw new Error('invalid');
      return { success: true, data: await this.issueTokens(user.id, user.role) };
    } catch { throw new UnauthorizedException({ success: false, message: 'Invalid refresh token', errorCode: 'INVALID_REFRESH_TOKEN' }); }
  }
  private async issueTokens(id: string, role: string) {
    const payload = { sub: id, role };
    const accessToken = await this.jwt.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_ACCESS_TTL ?? '15m' });
    const refreshToken = await this.jwt.signAsync(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: process.env.JWT_REFRESH_TTL ?? '7d' });
    await this.prisma.user.update({ where: { id }, data: { refreshTokenHash: await argon2.hash(refreshToken) } });
    return { accessToken, refreshToken };
  }
}
