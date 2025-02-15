export declare enum IngestionStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    COMPLETED = "completed",
    FAILED = "failed"
}
export declare class Ingestion {
    id: string;
    status: IngestionStatus;
    pythonJobId: string | null;
    createdAt: Date;
    completedAt: Date | null;
    metadata: any;
}
