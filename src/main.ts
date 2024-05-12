import { NestFactory } from '@nestjs/core';
import { AppModule } from './gateway.module';
import { ExceptionHandler } from './base/exception.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`Gateway is running on: ${process.env.API_GATEWAY_PORT}`);
  app.useGlobalFilters(new ExceptionHandler());
  await app.listen(process.env.API_GATEWAY_PORT);
}
bootstrap();
