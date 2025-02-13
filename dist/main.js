"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const users_seeders_1 = require("./users/seeders/users.seeders");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('API documentation for Users and Documents modules')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const usersSeeder = app.get(users_seeders_1.UsersSeeder);
    await usersSeeder.seedAdminUser();
    process.on('SIGINT', async () => {
        common_1.Logger.warn('🛑 SIGINT received! Closing application...');
        await app.close();
        common_1.Logger.log('✅ Application closed.');
        process.exit(0);
    });
    process.on('SIGTERM', async () => {
        common_1.Logger.warn('🛑 SIGTERM received! Closing application...');
        await app.close();
        common_1.Logger.log('✅ Application closed.');
        process.exit(0);
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map