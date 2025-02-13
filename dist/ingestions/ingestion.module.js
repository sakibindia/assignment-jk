"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const imgestion_entity_1 = require("./entities/imgestion.entity");
const ingestion_service_1 = require("./ingestion.service");
const ingestion_controller_1 = require("./ingestion.controller");
const axios_1 = require("@nestjs/axios");
let IngestionsModule = class IngestionsModule {
};
exports.IngestionsModule = IngestionsModule;
exports.IngestionsModule = IngestionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([imgestion_entity_1.Ingestion]),
            axios_1.HttpModule,
        ],
        controllers: [ingestion_controller_1.IngestionsController],
        providers: [ingestion_service_1.IngestionsService],
        exports: [ingestion_service_1.IngestionsService],
    })
], IngestionsModule);
//# sourceMappingURL=ingestion.module.js.map