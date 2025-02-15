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
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const documents_service_1 = require("./documents.service");
const roles_guard_1 = require("../auth/guards/roles-guard");
const user_role_enum_1 = require("../users/entities/user-role.enum");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const documents_dto_1 = require("./dto/documents.dto");
const users_entity_1 = require("../users/entities/users.entity");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const swagger_1 = require("@nestjs/swagger");
let DocumentsController = class DocumentsController {
    constructor(documentService) {
        this.documentService = documentService;
    }
    create(createDocumentDto, user) {
        return this.documentService.createDocument(createDocumentDto, user);
    }
    findAll(user) {
        return this.documentService.findAll(user);
    }
    findOne(id, user) {
        return this.documentService.findOne(id, user);
    }
    update(id, updateDocumentDto, user) {
        return this.documentService.updateDocument(id, updateDocumentDto, user);
    }
    remove(id, user) {
        return this.documentService.deleteDocument(id, user);
    }
    uploadFile(file, user) {
        return this.documentService.processUpload(file, user);
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create Document' }),
    (0, swagger_1.ApiBody)({ type: documents_dto_1.CreateDocumentDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Document successfully created.' }),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [documents_dto_1.CreateDocumentDto, users_entity_1.User]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get All Documents' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all documents.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Document by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Document ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Document retrieved successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_entity_1.User]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Document' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Document ID' }),
    (0, swagger_1.ApiBody)({ type: documents_dto_1.UpdateDocumentDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Document updated successfully.' }),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, documents_dto_1.UpdateDocumentDto,
        users_entity_1.User]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_entity_1.User]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR),
    (0, swagger_1.ApiOperation)({ summary: 'Upload File' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_entity_1.User]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "uploadFile", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, common_1.Controller)('documents'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [documents_service_1.DocumentService])
], DocumentsController);
//# sourceMappingURL=documents.controller.js.map