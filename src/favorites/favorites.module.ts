import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { LoggingService } from 'src/logging/logging.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, LoggingService],
  imports: [JwtModule]
})
export class FavoritesModule {}
