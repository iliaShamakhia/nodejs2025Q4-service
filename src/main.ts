import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import * as dotenv from 'dotenv';
import { LoggingService } from './logging/logging.service';
import { CustomHttpExceptionFilter } from './http-exception.filter';

dotenv.config();

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalFilters(new CustomHttpExceptionFilter());
  app.useLogger(app.get(LoggingService));

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