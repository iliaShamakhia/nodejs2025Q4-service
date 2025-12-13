import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LoggingService } from 'src/logging/logging.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, LoggingService],
})
export class UsersModule {}
