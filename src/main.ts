import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FakeDatabase } from './data/db';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';

export const db = new FakeDatabase();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = YAML.load('doc/api.yaml');

  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
