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
exports.CustomExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../../common/logger/logger.service");
let CustomExceptionFilter = class CustomExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const errorResponse = exception.getResponse();
        this.logger.error(`Error ${status}: ${JSON.stringify(errorResponse)}`);
        response.status(status).json(errorResponse);
    }
};
exports.CustomExceptionFilter = CustomExceptionFilter;
exports.CustomExceptionFilter = CustomExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], CustomExceptionFilter);
//# sourceMappingURL=exception.filter.js.map