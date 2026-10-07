import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IsNumber, IsString } from 'class-validator';

import { CouponService } from './coupon.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

class ValidateCouponDto {
  @IsString()
  code!: string;

  @IsNumber()
  cartTotal!: number;
}

@UseGuards(JwtAuthGuard)
@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post('validate')
  validateCoupon(@Body() body: ValidateCouponDto) {
    return this.couponService.validateCoupon(
      body.code,
      body.cartTotal,
    );
  }
}