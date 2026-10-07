import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async submitReview(userId: string, data: any) {
    const {
      orderItemId,
      rating,
      title,
      comment,
      imageUrl,
    } = data;

    // Find the order item and make sure it belongs to the logged-in user.
    const orderItem = await this.prisma.orderItem.findUnique({
      where: {
        id: orderItemId,
      },
      include: {
        order: true,
      },
    });

    if (!orderItem || orderItem.order.userId !== userId) {
      throw new BadRequestException('Invalid order item');
    }

    // Check whether this exact order item has already been reviewed.
    const existingReview = await this.prisma.review.findUnique({
      where: {
        orderItemId,
      },
    });

    if (existingReview) {
      throw new BadRequestException(
        'Review already submitted for this item',
      );
    }

    // Create the review.
    const review = await this.prisma.review.create({
      data: {
        userId,
        productId: orderItem.productId,
        orderId: orderItem.orderId,
        orderItemId,
        rating,
        title,
        comment,
        imageUrl,
        status: 'PENDING',
      },
    });

    return {
      success: true,
      data: review,
    };
  }

  async getProductReviews(productId: string) {
    const reviews = await this.prisma.review.findMany({
      where: {
        productId,
        status: 'APPROVED',
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const count = reviews.length;

    const average =
      count > 0
        ? reviews.reduce(
            (acc, curr) => acc + curr.rating,
            0,
          ) / count
        : 0;

    return {
      success: true,
      data: {
        reviews,
        stats: {
          count,
          average,
        },
      },
    };
  }
}