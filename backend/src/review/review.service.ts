import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async submitReview(userId: string, data: any) {
    const { orderItemId, rating, title, comment, imageUrl } = data;

    const orderItem = await this.prisma.orderItem.findUnique({
      where: { id: orderItemId },
      include: { order: true }
    });

    if (!orderItem || orderItem.order.userId !== userId) {
      throw new BadRequestException('Invalid order item');
    }

    const existingReview = await this.prisma.review.findFirst({
      where: { userId, productId: orderItem.productId, orderId: orderItem.orderId }
    });

    if (existingReview) {
      throw new BadRequestException('Review already submitted for this item');
    }

    const review = await this.prisma.review.create({
      data: {
        userId,
        productId: orderItem.productId,
        orderId: orderItem.orderId,
        rating,
        title,
        comment,
        imageUrl,
        status: 'PENDING'
      }
    });

    return { success: true, data: review };
  }

  async getProductReviews(productId: string) {
    const reviews = await this.prisma.review.findMany({
      where: { productId, status: 'APPROVED' },
      include: {
        user: { select: { firstName: true, lastName: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    const count = reviews.length;
    const average = count > 0 ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / count : 0;

    return { success: true, data: { reviews, stats: { count, average } } };
  }
}
