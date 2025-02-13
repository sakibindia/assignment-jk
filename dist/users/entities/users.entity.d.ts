import { UserRole } from './user-role.enum';
import { Document } from '../../documents/entity/documents.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    role: UserRole;
    documents: Document[];
    comparePassword(password: string): Promise<boolean>;
}
