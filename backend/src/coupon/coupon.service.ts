import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CouponService {
  constructor(private readonly prisma: PrismaService) {}

  async validateCoupon(code: string, cartTotal: number) {
    const normalizedCode = code.trim().toUpperCase();

    const coupon = await this.prisma.coupon.findUnique({
      where: {
        code: normalizedCode,
      },
    });

    if (!coupon) {
      throw new BadRequestException('Coupon not found');
    }

    if (!coupon.isActive) {
      throw new BadRequestException('Coupon is inactive');
    }

    const now = new Date();

    // Check coupon start date
    if (coupon.startsAt && coupon.startsAt > now) {
      throw new BadRequestException('Coupon is not active yet');
    }

    // Check coupon expiry
    if (coupon.expiresAt && coupon.expiresAt < now) {
      throw new BadRequestException('Coupon has expired');
    }

    // Check global usage limit
    if (
      coupon.usageLimit !== null &&
      coupon.usageCount >= coupon.usageLimit
    ) {
      throw new BadRequestException('Coupon usage limit reached');
    }

    // Check minimum purchase
    if (
      coupon.minimumPurchase !== null &&
      Number(cartTotal) < Number(coupon.minimumPurchase)
    ) {
      throw new BadRequestException(
        `Minimum purchase amount of ${coupon.minimumPurchase} required`,
      );
    }

    let discountAmount = 0;

    // Calculate percentage discount
    if (coupon.type === 'PERCENTAGE') {
      discountAmount =
        (Number(cartTotal) * Number(coupon.value)) / 100;

      // Apply maximum discount
      if (
        coupon.maximumDiscount !== null &&
        discountAmount > Number(coupon.maximumDiscount)
      ) {
        discountAmount = Number(coupon.maximumDiscount);
      }
    } else {
      // Fixed discount
      discountAmount = Number(coupon.value);
    }

    // Never allow discount to exceed cart total
    discountAmount = Math.min(
      discountAmount,
      Number(cartTotal),
    );

    return {
      success: true,
      data: {
        discountAmount,
        type: coupon.type,
      },
    };
  }
}