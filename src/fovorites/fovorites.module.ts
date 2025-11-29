import { Module } from '@nestjs/common';
import { FovoritesService } from './fovorites.service';
import { FovoritesController } from './fovorites.controller';

@Module({
  controllers: [FovoritesController],
  providers: [FovoritesService],
})
export class FovoritesModule {}
