import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FovoritesModule } from './fovorites/fovorites.module';

@Module({
  imports: [UsersModule, ArtistsModule, TracksModule, AlbumsModule, FovoritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
