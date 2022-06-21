import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser(process.env.JWT_SECRET));

  await app.listen(process.env.API_PORT, () => console.log('Server started on port', +process.env.API_PORT));
}
bootstrap();
