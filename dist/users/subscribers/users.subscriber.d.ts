import { EntitySubscriberInterface, UpdateEvent } from 'typeorm';
import { User } from '../entities/users.entity';
export declare class UserSubscriber implements EntitySubscriberInterface<User> {
    listenTo(): typeof User;
    beforeUpdate(event: UpdateEvent<User>): Promise<void>;
}
