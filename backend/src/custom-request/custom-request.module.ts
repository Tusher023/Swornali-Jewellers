import { Module } from '@nestjs/common';
import { CustomRequestController } from './custom-request.controller';
import { CustomRequestService } from './custom-request.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CustomRequestController],
  providers: [CustomRequestService, PrismaService],
})
export class CustomRequestModule {}
