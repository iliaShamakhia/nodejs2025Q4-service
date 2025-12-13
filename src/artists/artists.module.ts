import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { LoggingService } from 'src/logging/logging.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, LoggingService],
})
export class ArtistsModule {}
