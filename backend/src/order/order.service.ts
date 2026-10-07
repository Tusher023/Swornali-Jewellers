import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async placeOrder(userId: string, data: any) {
    const { addressId, paymentMethod, couponCode } = data;

    // ---------------------------------------------------------
    // 1. Get user's cart
    // ---------------------------------------------------------
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // ---------------------------------------------------------
    // 2. Validate shipping address
    // ---------------------------------------------------------
    const address = await this.prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address || address.userId !== userId) {
      throw new BadRequestException('Invalid address');
    }

    // ---------------------------------------------------------
    // 3. Calculate subtotal
    // ---------------------------------------------------------
    let subtotal = 0;

    for (const item of cart.items) {
      let unitPrice = Number(item.product.price);

      // Add variant price adjustment if a variant exists
      if (item.variant) {
        unitPrice += Number(item.variant.priceAdjustment);
      }

      subtotal += unitPrice * item.quantity;
    }

    // ---------------------------------------------------------
    // 4. Validate and calculate coupon
    // ---------------------------------------------------------
    let discount = 0;
    let coupon: Awaited<
      ReturnType<typeof this.prisma.coupon.findUnique>
    > = null;

    if (couponCode) {
      coupon = await this.prisma.coupon.findUnique({
        where: {
          code: couponCode.trim().toUpperCase(),
        },
      });

      if (!coupon) {
        throw new BadRequestException('Invalid coupon');
      }

      const now = new Date();

      // Check active status
      if (!coupon.isActive) {
        throw new BadRequestException('Coupon is inactive');
      }

      // Check start date
      if (coupon.startsAt && coupon.startsAt > now) {
        throw new BadRequestException('Coupon is not active yet');
      }

      // Check expiry
      if (coupon.expiresAt && coupon.expiresAt < now) {
        throw new BadRequestException('Coupon has expired');
      }

      // Check minimum purchase
      if (
        coupon.minimumPurchase !== null &&
        subtotal < Number(coupon.minimumPurchase)
      ) {
        throw new BadRequestException(
          `Minimum purchase of ${coupon.minimumPurchase} is required`,
        );
      }

      // Check global usage limit
      if (
        coupon.usageLimit !== null &&
        coupon.usageCount >= coupon.usageLimit
      ) {
        throw new BadRequestException('Coupon usage limit reached');
      }

      // Check per-user usage limit
      if (coupon.perUserLimit !== null) {
        const userCouponUsage = await this.prisma.couponUsage.count({
          where: {
            couponId: coupon.id,
            userId,
          },
        });

        if (userCouponUsage >= coupon.perUserLimit) {
          throw new BadRequestException(
            'You have already used this coupon the maximum number of times',
          );
        }
      }

      // Calculate discount
      if (coupon.type === 'PERCENTAGE') {
        discount = (subtotal * Number(coupon.value)) / 100;
      } else {
        discount = Number(coupon.value);
      }

      // Maximum discount limit
      if (
        coupon.maximumDiscount !== null &&
        discount > Number(coupon.maximumDiscount)
      ) {
        discount = Number(coupon.maximumDiscount);
      }

      // Discount can never be greater than subtotal
      discount = Math.min(discount, subtotal);
    }

    // ---------------------------------------------------------
    // 5. Delivery charge
    // ---------------------------------------------------------
    const deliveryTotal = 0;

    // ---------------------------------------------------------
    // 6. Final total
    // ---------------------------------------------------------
    const grandTotal = Math.max(
      0,
      subtotal - discount + deliveryTotal,
    );

    // ---------------------------------------------------------
    // 7. Generate order number
    // ---------------------------------------------------------
    const orderNumber = `SW-${Date.now()}`;

    // ---------------------------------------------------------
    // 8. Shipping address snapshot
    // ---------------------------------------------------------
    const shippingSnapshot = {
      label: address.label,
      recipientName: address.recipientName,
      phone: address.phone,
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      postalCode: address.postalCode,
      country: address.country,
    };

    // ---------------------------------------------------------
    // 9. Create order
    // ---------------------------------------------------------
    const order = await this.prisma.$transaction(async (tx) => {
      // Create order
      const createdOrder = await tx.order.create({
        data: {
          orderNumber,
          userId,
          status: 'PENDING',
          paymentStatus: 'PENDING',

          subtotal,
          discountTotal: discount,
          deliveryTotal,
          grandTotal,

          shippingSnapshot,

          couponId: coupon?.id ?? null,

          items: {
            create: cart.items.map((item) => {
              let unitPrice = Number(item.product.price);

              if (item.variant) {
                unitPrice += Number(item.variant.priceAdjustment);
              }

              return {
                productId: item.productId,
                variantId: item.variantId,
                productName: item.product.name,
                sku: item.variant?.sku ?? item.product.sku,
                unitPrice,
                quantity: item.quantity,
              };
            }),
          },

          payment: {
            create: {
              provider: paymentMethod,
              amount: grandTotal,
              status: 'PENDING',
            },
          },
        },

        include: {
          items: true,
          payment: true,
        },
      });

      // -------------------------------------------------------
      // 10. Update inventory
      // -------------------------------------------------------
      for (const item of cart.items) {
        const inventory = await tx.inventory.findUnique({
          where: {
            productId: item.productId,
          },
        });

        if (!inventory) {
          throw new BadRequestException(
            `Inventory not found for product ${item.product.name}`,
          );
        }

        const availableStock =
          inventory.stockQuantity - inventory.reservedQuantity;

        if (availableStock < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for ${item.product.name}`,
          );
        }

        await tx.inventory.update({
          where: {
            productId: item.productId,
          },
          data: {
            reservedQuantity: {
              increment: item.quantity,
            },
          },
        });

        // Update variant inventory if applicable
        if (item.variantId && item.variant) {
          const variant = await tx.productVariant.findUnique({
            where: {
              id: item.variantId,
            },
          });

          if (!variant || variant.stockQuantity < item.quantity) {
            throw new BadRequestException(
              `Insufficient stock for ${item.product.name}`,
            );
          }

          await tx.productVariant.update({
            where: {
              id: item.variantId,
            },
            data: {
              stockQuantity: {
                decrement: item.quantity,
              },
              reservedQuantity: {
                increment: item.quantity,
              },
            },
          });
        }
      }

      // -------------------------------------------------------
      // 11. Record coupon usage
      // -------------------------------------------------------
      if (coupon) {
        await tx.couponUsage.create({
          data: {
            couponId: coupon.id,
            userId,
            orderId: createdOrder.id,
          },
        });

        await tx.coupon.update({
          where: {
            id: coupon.id,
          },
          data: {
            usageCount: {
              increment: 1,
            },
          },
        });
      }

      // -------------------------------------------------------
      // 12. Clear cart
      // -------------------------------------------------------
      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      return createdOrder;
    });

    return {
      success: true,
      data: order,
    };
  }

  // ==========================================================
  // GET USER ORDERS
  // ==========================================================
  async getUserOrders(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        payment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      data: orders,
    };
  }

  // ==========================================================
  // GET SINGLE ORDER
  // ==========================================================
  async getOrder(userId: string, id: string) {
    const order = await this.prisma.order.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        payment: true,
        coupon: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return {
      success: true,
      data: order,
    };
  }

  // ==========================================================
  // CANCEL ORDER
  // ==========================================================
  async cancelOrder(userId: string, id: string) {
    const order = await this.prisma.order.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (
      order.status !== 'PENDING' &&
      order.status !== 'CONFIRMED'
    ) {
      throw new BadRequestException(
        'Cannot cancel order in current status',
      );
    }

    await this.prisma.$transaction(async (tx) => {
      // -------------------------------------------------------
      // Change order status
      // -------------------------------------------------------
      await tx.order.update({
        where: {
          id,
        },
        data: {
          status: 'CANCELLED',
        },
      });

      // -------------------------------------------------------
      // Release inventory
      // -------------------------------------------------------
      for (const item of order.items) {
        const inventory = await tx.inventory.findUnique({
          where: {
            productId: item.productId,
          },
        });

        if (inventory) {
          await tx.inventory.update({
            where: {
              productId: item.productId,
            },
            data: {
              reservedQuantity: Math.max(
                0,
                inventory.reservedQuantity - item.quantity,
              ),
            },
          });
        }

        // Release variant reservation
        if (item.variantId) {
          const variant = await tx.productVariant.findUnique({
            where: {
              id: item.variantId,
            },
          });

          if (variant) {
            await tx.productVariant.update({
              where: {
                id: item.variantId,
              },
              data: {
                reservedQuantity: Math.max(
                  0,
                  variant.reservedQuantity - item.quantity,
                ),
                stockQuantity: {
                  increment: item.quantity,
                },
              },
            });
          }
        }
      }
    });

    return {
      success: true,
      message: 'Order cancelled',
    };
  }
}