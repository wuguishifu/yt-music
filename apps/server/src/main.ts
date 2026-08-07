import 'dotenv/config';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({
    ignoreTrailingSlash: true,
    trustProxy: true,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    { rawBody: true },
  );

  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  const url = await app.getUrl();
  Logger.log(`🚀 Application is running on: ${url}`);
}

bootstrap();
