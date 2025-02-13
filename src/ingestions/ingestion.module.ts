import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingestion } from './entities/imgestion.entity';
import { IngestionsService } from './ingestion.service';
import { IngestionsController } from './ingestion.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ingestion]), // Register Ingestion entity
    HttpModule, // For HTTP requests to Python backend
  ],
  controllers: [IngestionsController],
  providers: [IngestionsService],
  exports: [IngestionsService], // Export if needed by other modules
})
export class IngestionsModule {}