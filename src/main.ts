import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobal } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerGlobal);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));

const swaggerConfig = new DocumentBuilder()
  .setTitle('API de Comercio Electrónico') // Título de la documentación
  // Descripción 
  .addBearerAuth()
  .setDescription('Documentación técnica de la API REST que respalda las operaciones del sistema de comercio electrónico') 
  .setVersion('1.0.0') // Versión 
  .build();

// Generación del documento Swagger 
const document = SwaggerModule.createDocument(app, swaggerConfig);

// Montaje de la interfaz de Swagger en la ruta '/api'
SwaggerModule.setup('api', app, document);


  await app.listen(process.env.PORT ?? 3000);

}

bootstrap();
