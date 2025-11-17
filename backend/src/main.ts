import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정 추가
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://34.59.147.161:3000',
      'https://justitia-nu.vercel.app'
    ],
    credentials: true,
  });

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Justitia API')
    .setDescription('Justitia Backend API Documentation')
    .setVersion('1.0')
    .addTag('justitia')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000,'0.0.0.0');
}
bootstrap();
