import { DataSource } from "typeorm";
declare const _default: (() => {
    type: string;
    database: string | undefined;
    host: string | undefined;
    port: number;
    username: string | undefined;
    password: string | undefined;
    autoLoadEntities: boolean;
    synchronize: boolean;
    logging: boolean;
    entities: string[];
    migrations: string[];
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    database: string | undefined;
    host: string | undefined;
    port: number;
    username: string | undefined;
    password: string | undefined;
    autoLoadEntities: boolean;
    synchronize: boolean;
    logging: boolean;
    entities: string[];
    migrations: string[];
}>;
export default _default;
export declare const connectionSource: DataSource;
