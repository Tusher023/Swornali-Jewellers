import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { IsString, IsNumber } from 'class-validator';

class ValidateCouponDto {
  @IsString() code: string;
  @IsNumber() cartTotal: number;
}

@UseGuards(JwtAuthGuard)
@Controller('api/coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post('validate')
  validateCoupon(@Body() body: ValidateCouponDto) {
    return this.couponService.validateCoupon(body.code, body.cartTotal);
  }
}
