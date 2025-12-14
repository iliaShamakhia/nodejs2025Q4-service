import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { LoggingService } from 'src/logging/logging.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, LoggingService],
  imports: [JwtModule]
})
export class ArtistsModule {}
