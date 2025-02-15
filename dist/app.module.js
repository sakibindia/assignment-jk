"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const redisStore = require("cache-manager");
const cache_manager_1 = require("@nestjs/cache-manager");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const logger_service_1 = require("./common/logger/logger.service");
const core_1 = require("@nestjs/core");
const logger_interceptors_1 = require("./common/interceptors/logger.interceptors");
const exception_filter_1 = require("./common/exceptions/exception.filter");
const typeorm_2 = require("typeorm");
const users_subscriber_1 = require("./users/subscribers/users.subscriber");
const documents_module_1 = require("./documents/documents.module");
let AppModule = class AppModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async onModuleDestroy() {
        if (this.dataSource.isInitialized) {
            console.log('closing db conn');
            await this.dataSource.destroy();
        }
    }
    async onApplicationShutdown() {
        if (this.dataSource.isInitialized) {
            console.log('closing db conn');
            console.log('Application is shutting down...');
            await this.dataSource.destroy();
        }
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            cache_manager_1.CacheModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    const useRedis = configService.get('USE_REDIS');
                    if (useRedis) {
                        return {
                            store: redisStore,
                            host: configService.get('REDIS_HOST') || 'localhost',
                            port: configService.get('REDIS_PORT') || 6379,
                            ttl: 60,
                        };
                    }
                    else {
                        return {
                            store: 'memory',
                            ttl: 60,
                            max: 100,
                        };
                    }
                },
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('PG_HOST') || 'localhost',
                    port: configService.get('PG_PORT') || 6379,
                    username: configService.get('PG_USERNAME') || 'postgres',
                    password: configService.get('PG_PASS') || 'jktech123',
                    database: configService.get('PG_DB') || 'jk-tech',
                    entities: [__dirname + '/**/*.entity.{ts,js}'],
                    synchronize: true,
                    subscribers: [users_subscriber_1.UserSubscriber],
                }),
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            documents_module_1.DocumentsModule
        ],
        providers: [
            logger_service_1.LoggerService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logger_interceptors_1.LoggingInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: exception_filter_1.CustomExceptionFilter
            }
        ],
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AppModule);
//# sourceMappingURL=app.module.js.map