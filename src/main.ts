import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FakeDatabase } from './data/db';

export const db = new FakeDatabase();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();
