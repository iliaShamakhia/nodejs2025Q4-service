import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { isValidArtistId, isValidUUID } from 'src/utils';
import { prisma } from 'prisma/prisma.service';

@Injectable()
export class TracksService {
  private prisma;
  
  constructor() {
    this.prisma = prisma;
  }

  async create(createTrackDto: CreateTrackDto) {
    const { name, duration, albumId, artistId } = createTrackDto;

    if (
      !name ||
      !duration ||
      !isValidArtistId(artistId) ||
      !isValidArtistId(albumId)
    ) {
      throw new BadRequestException('Invalid data to create track');
    }

    const track = await this.prisma.track.create({ data: createTrackDto });
    return track;
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid track id');
    }

    try {
      const track = await this.prisma.track.findUniqueOrThrow({
        where: { id },
      });
      return track;
    } catch (error) {
      throw new NotFoundException(`Track with id ${id} not found`, error);
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const { name, duration, albumId, artistId } = updateTrackDto;

    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    if (
      (!name && !duration && !albumId && !artistId) ||
      !isValidArtistId(artistId) ||
      !isValidArtistId(albumId)
    ) {
      throw new BadRequestException('Invalid data to update track');
    }

    const existingTrack = await this.prisma.track.findUnique({ where: { id } });
    if (!existingTrack) {
      throw new NotFoundException(`Updating track with id ${id} not found`);
    }

    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });
    return updatedTrack;
  }

  async remove(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid id');
    }

    try {
      const deletedTrack = await this.prisma.track.delete({ where: { id } });
      return deletedTrack;
    } catch (error) {
      throw new NotFoundException(`Deleting track with ${id} not found`);
    }
  }
}