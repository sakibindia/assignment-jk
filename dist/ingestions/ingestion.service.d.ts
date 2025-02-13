import { Repository } from 'typeorm';
import { Ingestion } from './entities/imgestion.entity';
import { HttpService } from '@nestjs/axios';
export declare class IngestionsService {
    private ingestionRepository;
    private httpService;
    constructor(ingestionRepository: Repository<Ingestion>, httpService: HttpService);
    triggerIngestion(metadata: any): Promise<Ingestion>;
    getIngestionStatus(id: string): Promise<Ingestion | null>;
}
