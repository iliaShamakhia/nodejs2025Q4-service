import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { LoggingService } from 'src/logging/logging.service';
@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, LoggingService],
})
export class FavoritesModule {}
