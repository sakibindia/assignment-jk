import { DocumentService } from './documents.service';
import { CreateDocumentDto, UpdateDocumentDto } from './dto/documents.dto';
import { User } from '../users/entities/users.entity';
export declare class DocumentsController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    create(createDocumentDto: CreateDocumentDto, user: User): Promise<import("./entity/documents.entity").Document>;
    findAll(user: User): Promise<import("./entity/documents.entity").Document[]>;
    findOne(id: string, user: User): Promise<import("./entity/documents.entity").Document>;
    update(id: string, updateDocumentDto: UpdateDocumentDto, user: User): Promise<import("./entity/documents.entity").Document>;
    remove(id: string, user: User): Promise<void>;
    uploadFile(file: Express.Multer.File, user: User): Promise<import("./entity/documents.entity").Document>;
}
