import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { IngestionsService } from './ingestion.service';
import { Ingestion } from './entities/imgestion.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controller for managing ingestion processes.
 */
@ApiTags('Ingestions')
@Controller('ingestions')
export class IngestionsController {
  /**
   * Constructor to inject the IngestionsService.
   * @param {IngestionsService} ingestionsService - The service handling ingestion logic.
   */
  constructor(private readonly ingestionsService: IngestionsService) {}

  /**
   * Endpoint to trigger a new ingestion.
   * 
   * @param {any} body - The ingestion data to start the process.
   * @returns {Promise<Ingestion>} - Returns the created ingestion record.
   */
  @Post()
  @ApiOperation({ summary: 'Trigger a new ingestion' })
  @ApiBody({ description: 'Ingestion data', type: Object })
  @ApiResponse({ status: 201, description: 'Ingestion triggered successfully', type: Ingestion })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async triggerIngestion(@Body() body: any): Promise<Ingestion> {
    return this.ingestionsService.triggerIngestion(body);
  }

  /**
   * Endpoint to get the status of an ingestion by its ID.
   * 
   * @param {string} id - The unique identifier of the ingestion.
   * @returns {Promise<Ingestion | null>} - Returns the ingestion status or null if not found.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get ingestion status by ID' })
  @ApiParam({ name: 'id', description: 'Ingestion ID', type: String })
  @ApiResponse({ status: 200, description: 'Ingestion status retrieved', type: Ingestion })
  @ApiResponse({ status: 404, description: 'Ingestion not found' })
  async getStatus(@Param('id') id: string): Promise<Ingestion | null> {
    return this.ingestionsService.getIngestionStatus(id);
  }
}
