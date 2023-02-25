import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFIlter } from './common/exceptions/exception.filter';
import * as fs from 'fs';

async function bootstrap() {
  const logger = new Logger();
  const isLocal = true;
  const httpsOptions = isLocal
    ? null
    : {
        key: fs.readFileSync('/etc/letsencrypt/live/prachang.shop/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/prachang.shop/cert.pem'),
      };

  const app = isLocal
    ? await NestFactory.create<NestExpressApplication>(AppModule)
    : await NestFactory.create<NestExpressApplication>(AppModule, {
        httpsOptions,
      });

  //* Static Assets
  app.useStaticAssets(join(__dirname, '..', 'public'));

  //* 전역으로 Pipes 설정
  app.useGlobalPipes(new ValidationPipe());

  //* 전역으로 Filter 설정
  app.useGlobalFilters(new HttpExceptionFIlter());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('실전프로젝트')
    .setDescription('stock ')
    .setVersion('1.0.0')
    .addTag('stockX')
    .build();

  //* Swagger Setup
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, swaggerDocument);
  app.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: ['Authorization', 'RefreshToken'],
  });

  if (isLocal)
    await app.listen(process.env.HTTP_PORT, () => {
      Logger.log(`${process.env.HTTP_PORT} 포트 실행 HTTP`);
    });
  if (!isLocal)
    await app.listen(process.env.HTTPS_PORT, () => {
      Logger.log(`${process.env.HTTPS_PORT} 포트 실행 hTTPS`);
    });
}
bootstrap();
