import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { LoggingService } from 'src/logging/logging.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, LoggingService],
})
export class AlbumsModule {}
