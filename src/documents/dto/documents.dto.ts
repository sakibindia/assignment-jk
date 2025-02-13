// src/documents/dto/document.dto.ts
export class CreateDocumentDto {
    title: string;
    content: string;
    fileType?: string;
    size?: number;
  }
  
  export class UpdateDocumentDto {
    title?: string;
    content?: string;
  }