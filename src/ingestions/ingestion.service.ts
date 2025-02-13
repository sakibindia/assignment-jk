import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingestion, IngestionStatus } from './entities/imgestion.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IngestionsService {
  constructor(
    @InjectRepository(Ingestion)
    private ingestionRepository: Repository<Ingestion>,
    private httpService: HttpService
  ) {}

  async triggerIngestion(metadata: any): Promise<Ingestion> {
    // 1. Create ingestion record
    const ingestion = this.ingestionRepository.create({
      status: IngestionStatus.PENDING,
      metadata
    });
    await this.ingestionRepository.save(ingestion);

    // 2. Call Python backend
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://python-backend/ingest', {
          ingestion_id: ingestion.id,
          metadata
        })
      );

      // 3. Update with Python job ID
      ingestion.pythonJobId = response.data.job_id;
      ingestion.status = IngestionStatus.PROCESSING;
      return this.ingestionRepository.save(ingestion);
    } catch (error) {
      ingestion.status = IngestionStatus.FAILED;
      await this.ingestionRepository.save(ingestion);
      throw new Error('Failed to trigger ingestion in Python backend');
    }
  }

  async getIngestionStatus(id: string): Promise<Ingestion | null> {
    return this.ingestionRepository.findOneBy({ id });
  }
}