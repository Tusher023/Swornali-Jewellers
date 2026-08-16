import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../auth/decorators';
import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

class SubmitReviewDto {
  @IsString() orderItemId: string;
  @IsNumber() @Min(1) @Max(5) rating: number;
  @IsString() @IsOptional() title?: string;
  @IsString() comment: string;
  @IsString() @IsOptional() imageUrl?: string;
}

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post('api/reviews')
  submitReview(@CurrentUser() user: any, @Body() body: SubmitReviewDto) {
    return this.reviewService.submitReview(user.userId, body);
  }

  @Get('api/products/:productId/reviews')
  getProductReviews(@Param('productId') productId: string) {
    return this.reviewService.getProductReviews(productId);
  }
}
