import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../auth/decorators';
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

class AddItemDto {
  @IsString()
  productId: string;

  @IsString()
  @IsOptional()
  variantId?: string;

  @IsNumber()
  @Min(1)
  quantity: number = 1;
}

class UpdateItemDto {
  @IsNumber()
  quantity: number;
}

@UseGuards(JwtAuthGuard)
@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@CurrentUser() user: any) {
    return this.cartService.getCart(user.userId);
  }

  @Post('items')
  addItem(@CurrentUser() user: any, @Body() body: AddItemDto) {
    return this.cartService.addItem(user.userId, body.productId, body.variantId, body.quantity);
  }

  @Patch('items/:id')
  updateItemQuantity(@CurrentUser() user: any, @Param('id') id: string, @Body() body: UpdateItemDto) {
    return this.cartService.updateItemQuantity(user.userId, id, body.quantity);
  }

  @Delete('items/:id')
  removeItem(@CurrentUser() user: any, @Param('id') id: string) {
    return this.cartService.removeItem(user.userId, id);
  }

  @Delete()
  clearCart(@CurrentUser() user: any) {
    return this.cartService.clearCart(user.userId);
  }
}
