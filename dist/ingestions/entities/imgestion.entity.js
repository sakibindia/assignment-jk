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
exports.Ingestion = exports.IngestionStatus = void 0;
const typeorm_1 = require("typeorm");
var IngestionStatus;
(function (IngestionStatus) {
    IngestionStatus["PENDING"] = "pending";
    IngestionStatus["PROCESSING"] = "processing";
    IngestionStatus["COMPLETED"] = "completed";
    IngestionStatus["FAILED"] = "failed";
})(IngestionStatus || (exports.IngestionStatus = IngestionStatus = {}));
let Ingestion = class Ingestion {
};
exports.Ingestion = Ingestion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Ingestion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: IngestionStatus, default: IngestionStatus.PENDING }),
    __metadata("design:type", String)
], Ingestion.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Ingestion.prototype, "pythonJobId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Ingestion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Ingestion.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Ingestion.prototype, "metadata", void 0);
exports.Ingestion = Ingestion = __decorate([
    (0, typeorm_1.Entity)()
], Ingestion);
//# sourceMappingURL=imgestion.entity.js.map