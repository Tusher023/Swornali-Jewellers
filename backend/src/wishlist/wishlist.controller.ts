import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { IsString } from 'class-validator';

import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../auth/decorators';

class AddWishlistDto {
  @IsString()
  productId!: string;
}

@UseGuards(JwtAuthGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  getWishlist(@CurrentUser() user: any) {
    return this.wishlistService.getWishlist(user.userId);
  }

  @Post('items')
  toggleItem(
    @CurrentUser() user: any,
    @Body() body: AddWishlistDto,
  ) {
    return this.wishlistService.toggleItem(
      user.userId,
      body.productId,
    );
  }

  @Delete('items/:productId')
  removeItem(
    @CurrentUser() user: any,
    @Param('productId') productId: string,
  ) {
    return this.wishlistService.removeItem(
      user.userId,
      productId,
    );
  }
}