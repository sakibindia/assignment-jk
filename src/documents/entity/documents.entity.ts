// src/documents/document.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/users.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  fileType: string;

  @Column('int')
  size: number;

  @ManyToOne(() => User, user => user.documents)
  owner: User;
}