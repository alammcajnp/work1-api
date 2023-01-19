import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 9001;
  await app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

bootstrap();
