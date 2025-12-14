import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LoggingService } from 'src/logging/logging.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService, LoggingService],
  exports: [UsersService],
  imports: [JwtModule]
})
export class UsersModule {}
