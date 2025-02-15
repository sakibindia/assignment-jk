// src/documents/documents.controller.ts

import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Put, 
  Delete, 
  UseGuards, 
  UploadedFile, 
  UseInterceptors 
} from '@nestjs/common';
import { DocumentService } from './documents.service';
import { RolesGuard } from '../auth/guards/roles-guard';
import { UserRole } from '../users/entities/user-role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateDocumentDto, UpdateDocumentDto } from './dto/documents.dto';
import { User } from '../users/entities/users.entity';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { 
  ApiBearerAuth, 
  ApiBody, 
  ApiConsumes, 
  ApiOperation, 
  ApiParam, 
  ApiResponse 
} from '@nestjs/swagger';

/**
 * DocumentsController handles CRUD operations and file uploads for documents.
 * It is protected by JWT authentication and role-based authorization.
 */
@Controller('documents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentsController {
  /**
   * Initializes the DocumentsController with the DocumentService.
   * @param documentService - The service used to manage documents.
   */
  constructor(private readonly documentService: DocumentService) {}

  /**
   * Creates a new document.
   * Only users with ADMIN or EDITOR roles can access this endpoint.
   * @param createDocumentDto - Data Transfer Object containing document details.
   * @param user - The currently authenticated user.
   * @returns The created document.
   */
  @Post()
  @ApiOperation({ summary: 'Create Document' })
  @ApiBody({ type: CreateDocumentDto })
  @ApiResponse({ status: 201, description: 'Document successfully created.' })
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  create(@Body() createDocumentDto: CreateDocumentDto, @CurrentUser() user: User) {
    return this.documentService.createDocument(createDocumentDto, user);
  }

  /**
   * Retrieves all documents accessible by the current user.
   * @param user - The currently authenticated user.
   * @returns List of all documents.
   */
  @Get()
  @ApiOperation({ summary: 'Get All Documents' })
  @ApiResponse({ status: 200, description: 'List of all documents.' })
  findAll(@CurrentUser() user: User) {
    return this.documentService.findAll(user);
  }

  /**
   * Retrieves a single document by its ID.
   * @param id - The ID of the document to retrieve.
   * @param user - The currently authenticated user.
   * @returns The requested document.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get Document by ID' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  @ApiResponse({ status: 200, description: 'Document retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Document not found.' })
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.documentService.findOne(id, user);
  }

  /**
   * Updates an existing document by its ID.
   * Only users with ADMIN or EDITOR roles can access this endpoint.
   * @param id - The ID of the document to update.
   * @param updateDocumentDto - Data Transfer Object containing updated document details.
   * @param user - The currently authenticated user.
   * @returns The updated document.
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update Document' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  @ApiBody({ type: UpdateDocumentDto })
  @ApiResponse({ status: 200, description: 'Document updated successfully.' })
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  update(
    @Param('id') id: string, 
    @Body() updateDocumentDto: UpdateDocumentDto, 
    @CurrentUser() user: User
  ) {
    return this.documentService.updateDocument(id, updateDocumentDto, user);
  }

  /**
   * Deletes a document by its ID.
   * Only users with ADMIN role can access this endpoint.
   * @param id - The ID of the document to delete.
   * @param user - The currently authenticated user.
   * @returns A confirmation message upon successful deletion.
   */
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.documentService.deleteDocument(id, user);
  }

  /**
   * Uploads a file related to a document.
   * Only users with ADMIN or EDITOR roles can access this endpoint.
   * @param file - The uploaded file (multipart/form-data).
   * @param user - The currently authenticated user.
   * @returns The result of the file upload process.
   */
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
