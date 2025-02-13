import { OnApplicationShutdown, OnModuleDestroy } from '@nestjs/common';
import { DataSource } from 'typeorm';
export declare class AppModule implements OnModuleDestroy, OnApplicationShutdown {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    onModuleDestroy(): Promise<void>;
    onApplicationShutdown(): Promise<void>;
}
