// src/documents/dto/document.dto.ts

/**
 * Data Transfer Object for creating a new document.
 * This DTO is used to validate and transfer data when creating a new document.
 */
export class CreateDocumentDto {
  /**
   * The title of the document.
   */
  title: string;

  /**
   * The content of the document.
   */
  content: string;

  /**
   * The type of the file (e.g., 'pdf', 'docx', 'txt').
   * This field is optional.
   */
  fileType?: string;

  /**
   * The size of the file in bytes.
   * This field is optional.
   */
  size?: number;
}

/**
 * Data Transfer Object for updating an existing document.
 * This DTO is used to validate and transfer data when updating a document.
 */
export class UpdateDocumentDto {
  /**
   * The updated title of the document.
   * This field is optional.
   */
  title?: string;

  /**
   * The updated content of the document.
   * This field is optional.
   */
  content?: string;
}
