// src/documents/document.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entity/documents.entity';
import { User } from '../users/entities/users.entity';
import { CreateDocumentDto, UpdateDocumentDto } from './dto/documents.dto';

/**
 * DocumentService handles all business logic related to documents,
 * including creation, retrieval, updating, deletion, and file processing.
 */
@Injectable()
export class DocumentService {
  /**
   * Initializes the service with the Document repository.
   * @param documentRepository - The repository to interact with Document entities.
   */
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  /**
   * Creates a new document for a specific user.
   * @param createDocumentDto - Data Transfer Object containing title, content, fileType, and size.
   * @param user - The user who owns the document.
   * @returns The created Document entity.
   */
  async createDocument(createDocumentDto: CreateDocumentDto, user: User): Promise<Document> {
    const document = this.documentRepository.create({
      ...createDocumentDto,
      owner: user,
    });
    return await this.documentRepository.save(document);
  }

  /**
   * Retrieves all documents belonging to a specific user.
   * @param user - The user whose documents are to be fetched.
   * @returns An array of Document entities.
   */
  async findAll(user: User): Promise<Document[]> {
    return this.documentRepository.find({
      where: { owner: { id: user.id } },
      relations: ['owner'],
    });
  }

  /**
   * Retrieves a single document by its ID for a specific user.
   * @param id - The ID of the document.
   * @param user - The user who owns the document.
   * @returns The found Document entity.
   * @throws NotFoundException if the document is not found.
   */
  async findOne(id: string, user: User): Promise<Document> {
    const document = await this.documentRepository.findOne({
      where: { id, owner: { id: user.id } },
      relations: ['owner'],
    });

    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return document;
  }

  /**
   * Updates an existing document by its ID for a specific user.
   * @param id - The ID of the document to update.
   * @param updateDocumentDto - Data Transfer Object containing updated fields.
   * @param user - The user who owns the document.
   * @returns The updated Document entity.
   * @throws NotFoundException if the document is not found.
   */
  async updateDocument(id: string, updateDocumentDto: UpdateDocumentDto, user: User): Promise<Document> {
    const document = await this.findOne(id, user);
    Object.assign(document, updateDocumentDto);
    return this.documentRepository.save(document);
  }

  /**
   * Deletes a document by its ID for a specific user.
   * @param id - The ID of the document to delete.
   * @param user - The user who owns the document.
   * @throws NotFoundException if the document is not found.
   */
  async deleteDocument(id: string, user: User): Promise<void> {
    const result = await this.documentRepository.delete({ id, owner: { id: user.id } });
    if (result.affected === 0) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
  }

  /**
   * Processes file upload and creates a document record for the uploaded file.
   * @param file - The uploaded file (Multer file object).
   * @param user - The user who owns the uploaded file.
   * @returns The created Document entity.
   * 
   * Note: This implementation assumes the file is saved locally.
   * In a real-world scenario, consider using cloud storage (e.g., AWS S3).
   */
  async processUpload(file: Express.Multer.File, user: User): Promise<Document> {
    // Implement file storage logic (e.g., save to disk/S3)
    const filePath = `/uploads/${file.originalname}`;
    
    return this.createDocument({
      title: file.originalname,
      content: filePath,
      fileType: file.mimetype,
      size: file.size,
    }, user);
  }
}
