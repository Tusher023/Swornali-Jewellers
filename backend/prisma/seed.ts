import { PrismaClient, ProductStatus, Role } from '@prisma/client';
import * as argon2 from 'argon2';
const prisma = new PrismaClient();
const products = [
  ['Celeste Solitaire Ring', 'celeste-solitaire-ring', 'RNG-001', 'Rings', 125000],
  ['Aurelia Pearl Necklace', 'aurelia-pearl-necklace', 'NCK-001', 'Necklaces', 89500],
  ['Luna Diamond Drop Earrings', 'luna-diamond-drop-earrings', 'EAR-001', 'Earrings', 72000],
  ['Serene Gold Bangle', 'serene-gold-bangle', 'BR-001', 'Bracelets', 64500],
];
async function main() {
  const categoryRows = await Promise.all(['Rings', 'Necklaces', 'Earrings', 'Bracelets'].map((name) => prisma.category.upsert({ where: { slug: name.toLowerCase() }, update: {}, create: { name, slug: name.toLowerCase(), description: `Signature ${name.toLowerCase()} from Swornali.` } })));
  const categoryByName = new Map(categoryRows.map((c) => [c.name, c]));
  const collection = await prisma.collection.upsert({ where: { slug: 'timeless-icons' }, update: {}, create: { name: 'Timeless Icons', slug: 'timeless-icons', description: 'Our enduring signatures.' } });
  for (const [name, slug, sku, category, price] of products) {
    const product = await prisma.product.upsert({ where: { slug }, update: {}, create: { name, slug, sku, description: `An exquisitely finished ${name.toLowerCase()}, designed for everyday heirloom moments.`, price, material: '18K Gold', goldPurity: '18K', weightGrams: 4.5, stoneType: 'Diamond', status: ProductStatus.PUBLISHED, categoryId: categoryByName.get(category)!.id, collectionId: collection.id } });
    await prisma.inventory.upsert({ where: { productId: product.id }, update: {}, create: { productId: product.id, stockQuantity: 12, lowStockThreshold: 3 } });
    await prisma.productImage.upsert({ where: { id: `${product.id}-image` }, update: {}, create: { id: `${product.id}-image`, productId: product.id, url: `https://images.unsplash.com/photo-${['1605100804763-247f67b3557e','1599643478518-a784e5dc4c8f','1535632066927-ab7c9ab60908','1617038220319-276d3cfab638'][products.findIndex((p) => p[1] === slug)]}?auto=format&fit=crop&w=1200&q=85`, altText: name, position: 0 } });
  }
  if (process.env.NODE_ENV !== 'production') await prisma.user.upsert({ where: { email: 'admin@swornali.local' }, update: {}, create: { email: 'admin@swornali.local', passwordHash: await argon2.hash('ChangeMe123!'), firstName: 'Swornali', lastName: 'Administrator', role: Role.ADMIN, cart: { create: {} }, wishlist: { create: {} } } });
}
main().finally(() => prisma.$disconnect());
