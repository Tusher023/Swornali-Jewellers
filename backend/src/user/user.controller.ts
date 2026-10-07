import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../auth/decorators';

class UpdateProfileDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phone?: string;
}

class AddressDto {
  @IsString()
  @IsOptional()
  label?: string;

  @IsString()
  recipientName!: string;

  @IsString()
  phone!: string;

  @IsString()
  line1!: string;

  @IsString()
  @IsOptional()
  line2?: string;

  @IsString()
  city!: string;

  @IsString()
  @IsOptional()
  postalCode?: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}

class UpdateAddressDto {
  @IsString()
  @IsOptional()
  label?: string;

  @IsString()
  @IsOptional()
  recipientName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  line1?: string;

  @IsString()
  @IsOptional()
  line2?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  postalCode?: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}

@UseGuards(JwtAuthGuard)
@Controller('users/me')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getProfile(@CurrentUser() user: any) {
    return this.userService.getProfile(user.userId);
  }

  @Patch()
  updateProfile(
    @CurrentUser() user: any,
    @Body() body: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(
      user.userId,
      body,
    );
  }

  @Get('addresses')
  getAddresses(@CurrentUser() user: any) {
    return this.userService.getAddresses(user.userId);
  }

  @Post('addresses')
  addAddress(
    @CurrentUser() user: any,
    @Body() body: AddressDto,
  ) {
    return this.userService.addAddress(
      user.userId,
      body,
    );
  }

  @Patch('addresses/:id')
  updateAddress(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() body: UpdateAddressDto,
  ) {
    return this.userService.updateAddress(
      user.userId,
      id,
      body,
    );
  }

  @Delete('addresses/:id')
  deleteAddress(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.userService.deleteAddress(
      user.userId,
      id,
    );
  }
}