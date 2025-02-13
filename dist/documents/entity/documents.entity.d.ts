import { User } from '../../users/entities/users.entity';
export declare class Document {
    id: string;
    title: string;
    content: string;
    fileType: string;
    size: number;
    owner: User;
}
