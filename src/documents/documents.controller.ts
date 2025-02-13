// src/documents/documents.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DocumentService } from './documents.service';
import { RolesGuard } from '../auth/guards/roles-guard';
import { UserRole } from '../users/entities/user-role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateDocumentDto, UpdateDocumentDto } from './dto/documents.dto';
import { User } from '../users/entities/users.entity';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('documents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentsController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @ApiOperation({ summary: 'Create Document' })
  @ApiBody({ type: CreateDocumentDto })
  @ApiResponse({ status: 201, description: 'Document successfully created.' })
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  create(@Body() createDocumentDto: CreateDocumentDto, @CurrentUser() user: User) {
    return this.documentService.createDocument(createDocumentDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Documents' })
  @ApiResponse({ status: 200, description: 'List of all documents.' })
  findAll(@CurrentUser() user: User) {
    return this.documentService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Document by ID' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  @ApiResponse({ status: 200, description: 'Document retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Document not found.' })
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.documentService.findOne(id, user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Document' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  @ApiBody({ type: UpdateDocumentDto })
  @ApiResponse({ status: 200, description: 'Document updated successfully.' })
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto, @CurrentUser() user: User) {
    return this.documentService.updateDocument(id, updateDocumentDto, user);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.documentService.deleteDocument(id, user);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  @ApiOperation({ summary: 'Upload File' })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile() file: Express.Multer.File, @CurrentUser() user: User) {
    return this.documentService.processUpload(file, user);
  }
}