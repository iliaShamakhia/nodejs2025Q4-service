import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FakeDatabase } from './data/db';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 4000;

export const db = new FakeDatabase();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = YAML.load('doc/api.yaml');

  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function (): string {
  return this.toString();
};