import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { UsersSeeder } from './users/seeders/users.seeders';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for Users and Documents modules')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document)
  const usersSeeder = app.get(UsersSeeder);
  await usersSeeder.seedAdminUser()
  process.on('SIGINT', async () => {
    Logger.warn('🛑 SIGINT received! Closing application...');
    await app.close();
    Logger.log('✅ Application closed.');
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    Logger.warn('🛑 SIGTERM received! Closing application...');
    await app.close();
    Logger.log('✅ Application closed.');
    process.exit(0);
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
