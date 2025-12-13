import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { LoggingService } from 'src/logging/logging.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, LoggingService],
})
export class TracksModule {}
