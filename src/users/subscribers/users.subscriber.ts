// src/users/users.subscriber.ts
import { EventSubscriber, EntitySubscriberInterface, UpdateEvent } from 'typeorm';
import { User } from '../entities/users.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  /**
   * Specifies the entity this subscriber is listening to.
   * 
   * @returns The User entity.
   */
  listenTo(): typeof User {
    return User;
  }

  /**
   * Triggered before an update operation on the User entity.
   * 
   * This method checks if the role field is being updated.
   * If a role update is detected, an error is thrown to prevent the change.
   * 
   * @param event - The update event containing entity and database state.
   * @throws Error if an attempt is made to update the role.
   */
  async beforeUpdate(event: UpdateEvent<User>): Promise<void> {
    // Check if the entity and its current database state are present
    if (event.entity && event.databaseEntity) {
      // Prevent role updates
      if (event.entity.role && event.entity.role !== event.databaseEntity.role) {
        throw new Error('Role updates are not allowed!');
      }
    }
  }
}
