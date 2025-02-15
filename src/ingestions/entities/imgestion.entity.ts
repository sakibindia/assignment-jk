import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

/**
 * Enumeration representing the possible statuses for ingestion.
 */
export enum IngestionStatus {
  /** Ingestion is pending and hasn't started processing yet. */
  PENDING = 'pending',

  /** Ingestion is currently being processed. */
  PROCESSING = 'processing',

  /** Ingestion has completed successfully. */
  COMPLETED = 'completed',

  /** Ingestion has failed during processing. */
  FAILED = 'failed'
}

/**
 * Ingestion entity representing the ingestion process details.
 */
@Entity()
export class Ingestion {
  /**
   * Unique identifier for each ingestion record.
   * @type {string}
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Status of the ingestion process.
   * Defaults to 'pending' when a new record is created.
   * @type {IngestionStatus}
   */
  @Column({ type: 'enum', enum: IngestionStatus, default: IngestionStatus.PENDING })
  status: IngestionStatus;

  /**
   * Identifier of the associated Python job, if applicable.
   * Nullable as it may not be assigned at creation.
   * @type {string | null}
   */
  @Column({ nullable: true })
  pythonJobId: string | null;

  /**
   * Timestamp when the ingestion record was created.
   * Automatically managed by TypeORM.
   * @type {Date}
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Timestamp when the ingestion process was completed.
   * Nullable as it may not be available if the process is not yet completed.
   * @type {Date | null}
   */
  @Column({ nullable: true })
  completedAt: Date | null;

  /**
   * Additional metadata related to the ingestion process.
   * Stored as a JSON object and is optional.
   * @type {any}
   */
  @Column({ type: 'json', nullable: true })
  metadata: any;
}
