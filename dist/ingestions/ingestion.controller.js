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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestionsController = void 0;
const common_1 = require("@nestjs/common");
const ingestion_service_1 = require("./ingestion.service");
const imgestion_entity_1 = require("./entities/imgestion.entity");
const swagger_1 = require("@nestjs/swagger");
let IngestionsController = class IngestionsController {
    constructor(ingestionsService) {
        this.ingestionsService = ingestionsService;
    }
    async triggerIngestion(body) {
        return this.ingestionsService.triggerIngestion(body);
    }
    async getStatus(id) {
        return this.ingestionsService.getIngestionStatus(id);
    }
};
exports.IngestionsController = IngestionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Trigger a new ingestion' }),
    (0, swagger_1.ApiBody)({ description: 'Ingestion data', type: Object }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Ingestion triggered successfully', type: imgestion_entity_1.Ingestion }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IngestionsController.prototype, "triggerIngestion", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get ingestion status by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Ingestion ID', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ingestion status retrieved', type: imgestion_entity_1.Ingestion }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ingestion not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IngestionsController.prototype, "getStatus", null);
exports.IngestionsController = IngestionsController = __decorate([
    (0, swagger_1.ApiTags)('Ingestions'),
    (0, common_1.Controller)('ingestions'),
    __metadata("design:paramtypes", [ingestion_service_1.IngestionsService])
], IngestionsController);
//# sourceMappingURL=ingestion.controller.js.map