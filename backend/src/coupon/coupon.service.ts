import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}

  async validateCoupon(code: string, cartTotal: number) {
    const coupon = await this.prisma.coupon.findUnique({ where: { code } });
    if (!coupon) {
      throw new BadRequestException('Coupon not found');
    }
    if (!coupon.isActive) {
      throw new BadRequestException('Coupon is inactive');
    }
    if (coupon.validUntil && coupon.validUntil < new Date()) {
      throw new BadRequestException('Coupon has expired');
    }
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      throw new BadRequestException('Coupon usage limit reached');
    }
    if (Number(cartTotal) < Number(coupon.minPurchaseAmount)) {
      throw new BadRequestException(`Minimum purchase amount of ${coupon.minPurchaseAmount} required`);
    }

    let discountAmount = 0;
    if (coupon.discountType === 'PERCENTAGE') {
      discountAmount = (cartTotal * Number(coupon.discountValue)) / 100;
      if (coupon.maxDiscountAmount && discountAmount > Number(coupon.maxDiscountAmount)) {
        discountAmount = Number(coupon.maxDiscountAmount);
      }
    } else {
      discountAmount = Number(coupon.discountValue);
    }

    return { success: true, data: { discountAmount, type: coupon.discountType } };
  }
}
