import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { LoggingService } from 'src/logging/logging.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, JwtModule],

  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    LoggingService,
  ],
  exports: [AuthService],
})
export class AuthModule {}