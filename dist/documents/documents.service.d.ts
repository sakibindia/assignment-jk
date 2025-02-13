import { Repository } from 'typeorm';
import { Document } from './entity/documents.entity';
import { User } from '../users/entities/users.entity';
import { CreateDocumentDto, UpdateDocumentDto } from './dto/documents.dto';
export declare class DocumentService {
    private documentRepository;
    constructor(documentRepository: Repository<Document>);
    createDocument(createDocumentDto: CreateDocumentDto, user: User): Promise<Document>;
    findAll(user: User): Promise<Document[]>;
    findOne(id: string, user: User): Promise<Document>;
    updateDocument(id: string, updateDocumentDto: UpdateDocumentDto, user: User): Promise<Document>;
    deleteDocument(id: string, user: User): Promise<void>;
    processUpload(file: Express.Multer.File, user: User): Promise<Document>;
}
