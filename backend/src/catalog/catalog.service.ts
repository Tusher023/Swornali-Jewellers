import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductStatus } from '@prisma/client';
import { PrismaService } from '../prisma.service';
@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}
  async categories() { return { success: true, data: await this.prisma.category.findMany({ where: { isActive: true }, orderBy: { name: 'asc' } }) }; }
  async products(q?: string, category?: string) {
    const products = await this.prisma.product.findMany({ where: { status: ProductStatus.PUBLISHED, ...(category ? { category: { slug: category } } : {}), ...(q ? { OR: [{ name: { contains: q, mode: 'insensitive' } }, { sku: { contains: q, mode: 'insensitive' } }, { description: { contains: q, mode: 'insensitive' } }] } : {}) }, include: { images: { take: 1, orderBy: { position: 'asc' } }, category: true }, orderBy: { createdAt: 'desc' }, take: 24 });
    return { success: true, data: products };
  }
  async product(slug: string) { const product = await this.prisma.product.findFirst({ where: { slug, status: ProductStatus.PUBLISHED }, include: { images: { orderBy: { position: 'asc' } }, variants: true, inventory: true, category: true, collection: true, reviews: { where: { status: 'APPROVED' }, include: { user: { select: { firstName: true, lastName: true } } } } } }); if (!product) throw new NotFoundException({ success: false, message: 'Product not found', errorCode: 'PRODUCT_NOT_FOUND' }); return { success: true, data: product }; }
}
