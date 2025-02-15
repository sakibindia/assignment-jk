/**
 * Enum representing the different user roles in the system.
 * Each role defines the level of access and permissions a user has.
 */
export enum UserRole {
  /**
   * Admin role - has full access to all system features.
   * Can manage users, settings, and content.
   */
  ADMIN = 'admin',

  /**
   * Editor role - has permissions to modify content but with restricted access to settings.
   * Cannot manage users or system configurations.
   */
  EDITOR = 'editor',

  /**
   * Viewer role - has read-only access to content.
   * Cannot modify or manage system data.
   */
  VIEWER = 'viewer',
}
