import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { isValidArtistId, isValidUUID } from 'src/utils';
import { prisma } from 'prisma/prisma.service';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class AlbumsService {
  private prisma;
  
  constructor(private logger: LoggingService) {
    this.prisma = prisma;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto;

    if (!name || !year || !isValidArtistId(artistId)) {
      this.logger.error('400 - Invalid data to create album');
      throw new BadRequestException('Invalid data to create album');
    }
    const album = await this.prisma.album.create({ data: createAlbumDto });
    return album;
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    if (!isValidUUID(id)) {
      this.logger.error('400 - Invalid album id');
      throw new BadRequestException('Invalid id');
    }

    try {
      const album = await this.prisma.album.findUniqueOrThrow({
        where: { id },
      });
      return album;
    } catch (error) {
      this.logger.warn(`404 - Album with id ${id} not found`);
      throw new NotFoundException(`Album with id ${id} not found`);
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const { name, year, artistId } = updateAlbumDto;

    if (!isValidUUID(id)) {
      this.logger.error(`400 - Invalid album id - ${id}`);
      throw new BadRequestException('Invalid id');
    }

    if ((!name && !year && !artistId) || !isValidArtistId(artistId)) {
      this.logger.error(`400 - Invalid data to update album`);
      throw new BadRequestException('Invalid data to update album');
    }

    try {
      await this.prisma.album.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      this.logger.warn(`404 - Updating album with id ${id} not found`);
      throw new NotFoundException(`Updating album with id ${id} not found`);
    }

    try {
      const updatedAlbum = await this.prisma.album.update({
        where: { id },
        data: updateAlbumDto,
      });

      return updatedAlbum;
    } catch (error) {
      this.logger.error(`400 - Something went wrong when update Album`);
      throw new BadRequestException(
        'Something went wrong when update Album',
        error,
      );
    }
  }

  async remove(id: string) {
    if (!isValidUUID(id)) {
      this.logger.error(`400 - Invalid album id`);
      throw new BadRequestException('Invalid album id');
    }

    try {
      const removedAlbum = await this.prisma.album.delete({ where: { id } });
      return removedAlbum;
    } catch (error) {
      this.logger.warn(`404 - Deleting album with id ${id} not found`);
      throw new NotFoundException(`Deleting album with id ${id} not found`);
    }
  }
}