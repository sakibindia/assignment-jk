// documents/documents.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsController } from '../../documents/documents.controller';
import { DocumentService } from '../../documents/documents.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Document } from '../../documents/entity/documents.entity';
import { User } from '../../users/entities/users.entity';

describe('DocumentsController', () => {
  let controller: DocumentsController;
  let service: DocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentsController],
      providers: [
        DocumentService,
        {
          provide: getRepositoryToken(Document),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DocumentsController>(DocumentsController);
    service = module.get<DocumentService>(DocumentService);
  });

  describe('uploadFile', () => {
    it('should return created document', async () => {
      // Mock file
      const mockFile = {
        originalname: 'test.pdf',
        buffer: Buffer.from('test'),
      } as Express.Multer.File;

      // Mock user using Partial<User>
      const mockUser: Partial<User> = {
        id: '1',
        email: 'test@example.com',
      };

      // Mock document using Partial<Document>
      const mockDocument: Partial<Document> = {
        id: '1',
        content: 'test.pdf',
        owner: mockUser as User,
      };

      // Mock service method
      jest.spyOn(service, 'processUpload').mockResolvedValue(mockDocument as Document);

      // Call controller method with both file and user
      const result = await controller.uploadFile(mockFile, mockUser as User);

      // Assertions
      expect(result).toBeDefined();
      expect(result.content).toBe('test.pdf');
      expect(service.processUpload).toHaveBeenCalledWith(mockFile, mockUser);
    });
  });
});
