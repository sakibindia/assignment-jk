import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingestion, IngestionStatus } from './entities/imgestion.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

/**
 * IngestionsService handles the business logic for managing ingestion processes.
 * It is responsible for creating ingestion records, triggering ingestion jobs in
 * the Python backend, and retrieving the status of ingestions.
 */
@Injectable()
export class IngestionsService {
  constructor(
    /**
     * Injects the TypeORM repository for Ingestion entity.
     * This repository is used to perform CRUD operations on the database.
     */
    @InjectRepository(Ingestion)
    private ingestionRepository: Repository<Ingestion>,

    /**
     * Injects the HttpService to make HTTP requests.
     * It is used to communicate with the Python backend for triggering ingestion jobs.
     */
    private httpService: HttpService
  ) {}

  /**
   * Triggers a new ingestion process.
   * 
   * 1. Creates a new ingestion record with status set to PENDING.
   * 2. Makes an HTTP POST request to the Python backend to initiate the ingestion job.
   * 3. Updates the ingestion record with the Python job ID and sets the status to PROCESSING.
   * 4. If an error occurs, sets the status to FAILED and throws an error.
   * 
   * @param metadata - Metadata related to the ingestion process.
   * @returns Promise<Ingestion> - The created ingestion record with updated status.
   * @throws Error if the ingestion job fails to start in the Python backend.
   */
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
      // 4. Handle error and update status to FAILED
      ingestion.status = IngestionStatus.FAILED;
      await this.ingestionRepository.save(ingestion);
      throw new Error('Failed to trigger ingestion in Python backend');
    }
  }

  /**
   * Retrieves the status of an ingestion by its ID.
   * 
   * @param id - The ID of the ingestion.
   * @returns Promise<Ingestion | null> - The ingestion record if found, otherwise null.
   */
  async getIngestionStatus(id: string): Promise<Ingestion | null> {
    return this.ingestionRepository.findOneBy({ id });
  }
}
