// src/users/users.subscriber.ts
import { EventSubscriber, EntitySubscriberInterface, UpdateEvent } from 'typeorm';
import { User } from '../entities/users.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async beforeUpdate(event: UpdateEvent<User>) {
    if (event.entity && event.databaseEntity) {
        // Prevent role updates
        if (event.entity.role && event.entity.role !== event.databaseEntity.role) {
          throw new Error('Role updates are not allowed!');
        }
      }
  }
}