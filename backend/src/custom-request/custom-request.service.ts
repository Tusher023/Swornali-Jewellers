import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CustomRequestService {
  constructor(private prisma: PrismaService) {}

  async submitRequest(userId: string, data: any) {
    const request = await this.prisma.customJewelryRequest.create({
      data: {
        userId,
        ...data,
        status: 'PENDING'
      }
    });
    return { success: true, data: request };
  }

  async getUserRequests(userId: string) {
    const requests = await this.prisma.customJewelryRequest.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: requests };
  }

  async getRequestDetail(userId: string, id: string) {
    const request = await this.prisma.customJewelryRequest.findFirst({
      where: { id, userId }
    });
    if (!request) throw new NotFoundException('Request not found');
    return { success: true, data: request };
  }
}
