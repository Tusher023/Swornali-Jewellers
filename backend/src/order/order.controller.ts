import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';

import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../auth/decorators';

class PlaceOrderDto {
  @IsString()
  addressId!: string;

  @IsString()
  paymentMethod!: string;

  @IsString()
  @IsOptional()
  couponCode?: string;
}

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  placeOrder(
    @CurrentUser() user: any,
    @Body() body: PlaceOrderDto,
  ) {
    return this.orderService.placeOrder(
      user.userId,
      body,
    );
  }

  @Get()
  getUserOrders(@CurrentUser() user: any) {
    return this.orderService.getUserOrders(user.userId);
  }

  @Get(':id')
  getOrder(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.orderService.getOrder(
      user.userId,
      id,
    );
  }

  @Patch(':id/cancel')
  cancelOrder(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.orderService.cancelOrder(
      user.userId,
      id,
    );
  }
}