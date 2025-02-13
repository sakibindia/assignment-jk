import { User } from '../../users/entities/users.entity';
export declare const CurrentUser: <K extends keyof User | undefined>(...dataOrPipes: (K | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
