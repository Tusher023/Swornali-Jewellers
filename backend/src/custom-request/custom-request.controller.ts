import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

import { IsNumber, IsOptional, IsString } from 'class-validator';

import { CustomRequestService } from './custom-request.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../auth/decorators';

class SubmitCustomRequestDto {
  @IsString()
  jewelryType!: string;

  @IsString()
  description!: string;

  @IsString()
  @IsOptional()
  referenceImageUrl?: string;

  @IsString()
  @IsOptional()
  material?: string;

  @IsString()
  @IsOptional()
  goldPurity?: string;

  @IsString()
  @IsOptional()
  size?: string;

  @IsNumber()
  @IsOptional()
  budget?: number;
}

@UseGuards(JwtAuthGuard)
@Controller('custom-requests')
export class CustomRequestController {
  constructor(
    private readonly customRequestService: CustomRequestService,
  ) {}

  @Post()
  submitRequest(
    @CurrentUser() user: any,
    @Body() body: SubmitCustomRequestDto,
  ) {
    return this.customRequestService.submitRequest(
      user.userId,
      body,
    );
  }

  @Get()
  getUserRequests(@CurrentUser() user: any) {
    return this.customRequestService.getUserRequests(
      user.userId,
    );
  }

  @Get(':id')
  getRequestDetail(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.customRequestService.getRequestDetail(
      user.userId,
      id,
    );
  }
}