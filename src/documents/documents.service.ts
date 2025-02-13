// src/documents/document.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entity/documents.entity';
import { User } from '../users/entities/users.entity';
import { CreateDocumentDto, UpdateDocumentDto } from './dto/documents.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async createDocument(createDocumentDto: CreateDocumentDto, user: User): Promise<Document> {
    const document = this.documentRepository.create({
      ...createDocumentDto,
      owner: user,
    });
    return await this.documentRepository.save(document);
  }

  async findAll(user: User): Promise<Document[]> {
    return this.documentRepository.find({
      where: { owner: { id: user.id } },
      relations: ['owner'],
    });
  }

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

  async updateDocument(id: string, updateDocumentDto: UpdateDocumentDto, user: User): Promise<Document> {
    const document = await this.findOne(id, user);
    Object.assign(document, updateDocumentDto);
    return this.documentRepository.save(document);
  }

  async deleteDocument(id: string, user: User): Promise<void> {
    const result = await this.documentRepository.delete({ id, owner: { id: user.id } });
    if (result.affected === 0) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
  }

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