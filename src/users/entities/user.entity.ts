import { IUser } from 'src/types';

export class User implements IUser {
  constructor(
    public id: string,
    public login: string,
    public password: string,
    public version: number,
    public createdAt: number,
    public updatedAt: number,
  ) {}
}
