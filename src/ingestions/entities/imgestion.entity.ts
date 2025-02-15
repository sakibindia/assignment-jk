import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum IngestionStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

@Entity()
export class Ingestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: IngestionStatus, default: IngestionStatus.PENDING })
  status: IngestionStatus;

  @Column({ type: 'varchar', nullable: true })
  pythonJobId: string;

  @CreateDateColumn()
  createdAt: Date;

  // Fixed: Explicit timestamp type with nullability
  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date | null;

  @Column({ type: 'json', nullable: true })
  metadata: any;
}