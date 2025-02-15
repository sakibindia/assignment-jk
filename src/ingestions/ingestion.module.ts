import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingestion } from './entities/imgestion.entity';
import { IngestionsService } from './ingestion.service';
import { IngestionsController } from './ingestion.controller';
import { HttpModule } from '@nestjs/axios';

/**
 * IngestionsModule is responsible for managing the ingestion process.
 * It integrates the Ingestion entity with TypeORM and allows communication
 * with the Python backend via HTTP requests.
 */
@Module({
  imports: [
    /**
     * Registers the Ingestion entity with TypeORM.
     * This allows the repository to be injected and used in services.
     */
    TypeOrmModule.forFeature([Ingestion]),

    /**
     * HttpModule is imported to enable HTTP requests to the Python backend.
     * This can be used for triggering or monitoring ingestion jobs.
     */
    HttpModule,
  ],
  /**
   * Declares the controllers used by this module.
   * IngestionsController handles HTTP requests for ingestion operations.
   */
  controllers: [IngestionsController],

  /**
   * Declares the service providers used by this module.
   * IngestionsService contains the business logic for managing ingestions.
   */
  providers: [IngestionsService],

  /**
   * Exports the IngestionsService so it can be used in other modules if needed.
   */
  exports: [IngestionsService],
})
export class IngestionsModule {}
