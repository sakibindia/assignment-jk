// src/documents/documents.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { Document } from './entity/documents.entity';

/**
 * DocumentsModule is responsible for managing the documents feature.
 * It imports the TypeOrmModule to interact with the Document entity,
 * provides the DocumentService for business logic,
 * and exposes the DocumentsController for handling HTTP requests.
 */
@Module({
  imports: [
    /**
     * TypeOrmModule.forFeature registers the Document entity with TypeORM,
     * enabling repository access for the Document entity within this module.
     */
    TypeOrmModule.forFeature([Document])
  ],
  controllers: [
    /**
     * DocumentsController handles the routing for CRUD operations and file uploads.
     */
    DocumentsController
  ],
  providers: [
    /**
     * DocumentService contains the business logic for managing documents.
     */
    DocumentService
  ],
  exports: [
    /**
     * Exports DocumentService to be used in other modules if required.
     */
    DocumentService
  ],
})
export class DocumentsModule {}
