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
exports.IngestionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const imgestion_entity_1 = require("./entities/imgestion.entity");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let IngestionsService = class IngestionsService {
    constructor(ingestionRepository, httpService) {
        this.ingestionRepository = ingestionRepository;
        this.httpService = httpService;
    }
    async triggerIngestion(metadata) {
        const ingestion = this.ingestionRepository.create({
            status: imgestion_entity_1.IngestionStatus.PENDING,
            metadata
        });
        await this.ingestionRepository.save(ingestion);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post('http://python-backend/ingest', {
                ingestion_id: ingestion.id,
                metadata
            }));
            ingestion.pythonJobId = response.data.job_id;
            ingestion.status = imgestion_entity_1.IngestionStatus.PROCESSING;
            return this.ingestionRepository.save(ingestion);
        }
        catch (error) {
            ingestion.status = imgestion_entity_1.IngestionStatus.FAILED;
            await this.ingestionRepository.save(ingestion);
            throw new Error('Failed to trigger ingestion in Python backend');
        }
    }
    async getIngestionStatus(id) {
        return this.ingestionRepository.findOneBy({ id });
    }
};
exports.IngestionsService = IngestionsService;
exports.IngestionsService = IngestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(imgestion_entity_1.Ingestion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService])
], IngestionsService);
//# sourceMappingURL=ingestion.service.js.map