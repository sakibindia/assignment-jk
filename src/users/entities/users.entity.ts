import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user-role.enum';
import { Document } from '../../documents/entity/documents.entity';

@Entity()
export class User {
  /**
   * Unique identifier for the user.
   * Generated as a UUID.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * User's email address.
   * Must be unique across all users.
   */
  @Column({ unique: true })
  email: string;

  /**
   * Hashed password of the user.
   * Stored securely using bcrypt hashing.
   */
  @Column()
  password: string;

  /**
   * Role of the user within the system.
   * Defaults to 'VIEWER' if no role is specified.
   */
  @Column({ type: 'enum', enum: UserRole, default: UserRole.VIEWER })
  role: UserRole;

  /**
   * List of documents associated with the user.
   * Represents a one-to-many relationship with the Document entity.
   */
  documents: Document[];

  /**
   * Compares a plain text password with the user's hashed password.
   * 
   * @param password - The plain text password to compare.
   * @returns A promise that resolves to true if the passwords match, otherwise false.
   */
  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
