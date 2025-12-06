import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  createFavTrack(@Param('id') id: string) {
    return this.favoritesService.addFavArtist(id);
  }

  @Post('album/:id')
  createFavAlbum(@Param('id') id: string) {
    return this.favoritesService.addFavArtist(id);
  }

  @Post('artist/:id')
  createFavArtist(@Param('id') id: string) {
    return this.favoritesService.addFavArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteFavTrack(@Param('id') id: string) {
    return this.favoritesService.removeFavTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteFavAlbum(@Param('id') id: string) {
    return this.favoritesService.removeFavAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteFavArtist(@Param('id') id: string) {
    return this.favoritesService.removeFavArtist(id);
  }
}
