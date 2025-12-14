import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { LoggingService } from 'src/logging/logging.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [TracksController],
  providers: [TracksService, LoggingService],
  imports: [JwtModule]
})
export class TracksModule {}
