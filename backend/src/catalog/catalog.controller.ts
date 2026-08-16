import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';
@Controller()
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}
  @Get('categories') categories() { return this.catalog.categories(); }
  @Get('products') products(@Query('q') q?: string, @Query('category') category?: string) { return this.catalog.products(q, category); }
  @Get('products/:slug') product(@Param('slug') slug: string) { return this.catalog.product(slug); }
}
