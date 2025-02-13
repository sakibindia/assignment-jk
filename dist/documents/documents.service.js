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
exports.DocumentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const documents_entity_1 = require("./entity/documents.entity");
let DocumentService = class DocumentService {
    constructor(documentRepository) {
        this.documentRepository = documentRepository;
    }
    async createDocument(createDocumentDto, user) {
        const document = this.documentRepository.create({
            ...createDocumentDto,
            owner: user,
        });
        return await this.documentRepository.save(document);
    }
    async findAll(user) {
        return this.documentRepository.find({
            where: { owner: { id: user.id } },
            relations: ['owner'],
        });
    }
    async findOne(id, user) {
        const document = await this.documentRepository.findOne({
            where: { id, owner: { id: user.id } },
            relations: ['owner'],
        });
        if (!document) {
            throw new common_1.NotFoundException(`Document with ID ${id} not found`);
        }
        return document;
    }
    async updateDocument(id, updateDocumentDto, user) {
        const document = await this.findOne(id, user);
        Object.assign(document, updateDocumentDto);
        return this.documentRepository.save(document);
    }
    async deleteDocument(id, user) {
        const result = await this.documentRepository.delete({ id, owner: { id: user.id } });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Document with ID ${id} not found`);
        }
    }
    async processUpload(file, user) {
        const filePath = `/uploads/${file.originalname}`;
        return this.createDocument({
            title: file.originalname,
            content: filePath,
            fileType: file.mimetype,
            size: file.size,
        }, user);
    }
};
exports.DocumentService = DocumentService;
exports.DocumentService = DocumentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(documents_entity_1.Document)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DocumentService);
//# sourceMappingURL=documents.service.js.map