import { IngestionsService } from './ingestion.service';
import { Ingestion } from './entities/imgestion.entity';
export declare class IngestionsController {
    private readonly ingestionsService;
    constructor(ingestionsService: IngestionsService);
    triggerIngestion(body: any): Promise<Ingestion>;
    getStatus(id: string): Promise<Ingestion | null>;
}
