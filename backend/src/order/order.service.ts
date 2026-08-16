import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async placeOrder(userId: string, data: any) {
    const { addressId, paymentMethod, couponCode } = data;
    
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const address = await this.prisma.address.findUnique({ where: { id: addressId } });
    if (!address || address.userId !== userId) {
      throw new BadRequestException('Invalid address');
    }

    let subtotal = 0;
    cart.items.forEach(item => {
      subtotal += Number(item.product.basePrice) * item.quantity;
    });

    let discount = 0;
    if (couponCode) {
      const coupon = await this.prisma.coupon.findUnique({ where: { code: couponCode } });
      if (coupon && coupon.isActive && (!coupon.validUntil || coupon.validUntil > new Date()) && Number(subtotal) >= Number(coupon.minPurchaseAmount)) {
        if (coupon.discountType === 'PERCENTAGE') {
          discount = (subtotal * Number(coupon.discountValue)) / 100;
        } else {
          discount = Number(coupon.discountValue);
        }
      } else {
        throw new BadRequestException('Invalid or expired coupon');
      }
    }

    const deliveryFee = 0;
    const grandTotal = subtotal - discount + deliveryFee;
    const orderNumber = 'SW-' + Date.now();

    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        userId,
        status: 'PENDING',
        totalAmount: grandTotal,
        items: {
          create: cart.items.map(item => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            priceAtTime: item.product.basePrice,
          }))
        },
        payment: {
          create: {
            amount: grandTotal,
            provider: paymentMethod,
            status: 'PENDING'
          }
        },
        shippingAddress: address.line1 + (address.line2 ? ', ' + address.line2 : '') + ', ' + address.city,
      },
      include: { items: true, payment: true }
    });

    // Update inventory
    for (const item of cart.items) {
      const inventory = await this.prisma.inventory.findUnique({ where: { productId: item.productId } });
      if (inventory) {
        await this.prisma.inventory.update({
          where: { productId: item.productId },
          data: {
            stockQuantity: Math.max(0, inventory.stockQuantity - item.quantity),
            reservedQuantity: inventory.reservedQuantity + item.quantity
          }
        });
      }
    }

    // Record coupon usage
    if (couponCode) {
      const coupon = await this.prisma.coupon.findUnique({ where: { code: couponCode } });
      if (coupon) {
        await this.prisma.couponUsage.create({
          data: { couponId: coupon.id, userId, orderId: order.id }
        });
        await this.prisma.coupon.update({
          where: { id: coupon.id },
          data: { usedCount: coupon.usedCount + 1 }
        });
      }
    }

    // Clear cart
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return { success: true, data: order };
  }

  async getUserOrders(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: orders };
  }

  async getOrder(userId: string, id: string) {
    const order = await this.prisma.order.findFirst({
      where: { id, userId },
      include: { items: { include: { product: true } }, payment: true }
    });
    if (!order) throw new NotFoundException('Order not found');
    return { success: true, data: order };
  }

  async cancelOrder(userId: string, id: string) {
    const order = await this.prisma.order.findFirst({
      where: { id, userId },
      include: { items: true }
    });
    if (!order) throw new NotFoundException('Order not found');

    if (order.status !== 'PENDING' && order.status !== 'CONFIRMED') {
      throw new BadRequestException('Cannot cancel order in current status');
    }

    await this.prisma.order.update({
      where: { id },
      data: { status: 'CANCELLED' }
    });

    for (const item of order.items) {
      const inventory = await this.prisma.inventory.findUnique({ where: { productId: item.productId } });
      if (inventory) {
        await this.prisma.inventory.update({
          where: { productId: item.productId },
          data: {
            stockQuantity: inventory.stockQuantity + item.quantity,
            reservedQuantity: Math.max(0, inventory.reservedQuantity - item.quantity)
          }
        });
      }
    }

    return { success: true, message: 'Order cancelled' };
  }
}
