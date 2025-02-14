import { Test, TestingModule } from '@nestjs/testing';
import { IngestionsController } from '../../ingestions/ingestion.controller';
import { IngestionsService } from '../../ingestions/ingestion.service';
import { Ingestion } from '../../ingestions/entities/imgestion.entity';
import { IngestionStatus } from '../../ingestions/entities/imgestion.entity';

describe('IngestionsController', () => {
    let controller: IngestionsController;
    let service: IngestionsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [IngestionsController],
            providers: [
                {
                    provide: IngestionsService,
                    useValue: {
                        triggerIngestion: jest.fn(),
                        getIngestionStatus: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<IngestionsController>(IngestionsController);
        service = module.get<IngestionsService>(IngestionsService);
    });

    describe('triggerIngestion', () => {
        it('should trigger a new ingestion and return the created entity', async () => {
            const mockIngestion = new Ingestion();
            mockIngestion.id = 'uuid-123';
            mockIngestion.status = IngestionStatus.PENDING;

            jest.spyOn(service, 'triggerIngestion').mockResolvedValue(mockIngestion);

            const result = await controller.triggerIngestion({});
            expect(result).toBeInstanceOf(Ingestion);
            expect(result.id).toBe('uuid-123');
            expect(result.status).toBe(IngestionStatus.PENDING);
            expect(service.triggerIngestion).toHaveBeenCalledWith({});
        });
    });

    describe('getStatus', () => {
        it('should return ingestion status by ID', async () => {
            const mockIngestion = new Ingestion();
            mockIngestion.id = 'uuid-123';
            mockIngestion.status = IngestionStatus.PROCESSING;

            jest.spyOn(service, 'getIngestionStatus').mockResolvedValue(mockIngestion);

            const result = await controller.getStatus('uuid-123');
            expect(result).toBeInstanceOf(Ingestion);
            expect(result?.id).toBe('uuid-123');
            expect(result?.status).toBe(IngestionStatus.PROCESSING);
            expect(service.getIngestionStatus).toHaveBeenCalledWith('uuid-123');
        });
    });
});
