import { IArtist } from 'src/types';

export class Artist implements IArtist {
  constructor(
    public id: string,
    public name: string,
    public grammy: boolean,
  ) {}
}
