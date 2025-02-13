import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { IngestionsService } from './ingestion.service';
import { Ingestion } from './entities/imgestion.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('ingestions')
export class IngestionsController {
  constructor(private readonly ingestionsService: IngestionsService) {}

  @Post()
  @ApiOperation({ summary: 'Trigger a new ingestion' })
  @ApiBody({ description: 'Ingestion data', type: Object })
  @ApiResponse({ status: 201, description: 'Ingestion triggered successfully', type: Ingestion })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async triggerIngestion(@Body() body: any): Promise<Ingestion> {
    return this.ingestionsService.triggerIngestion(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ingestion status by ID' })
  @ApiParam({ name: 'id', description: 'Ingestion ID', type: String })
  @ApiResponse({ status: 200, description: 'Ingestion status retrieved', type: Ingestion })
  @ApiResponse({ status: 404, description: 'Ingestion not found' })
  async getStatus(@Param('id') id: string): Promise<Ingestion | null> {
    return this.ingestionsService.getIngestionStatus(id);
  }
}