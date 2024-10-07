import {DataSource, DefaultNamingStrategy, NamingStrategyInterface} from "typeorm";
import {Escalation, NcClassification, NonConformity, Question, Survey} from "@/entities/Entities";

class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    public columnName(propertyName: string, customName: string | undefined, embeddedPrefixes: string[]): string {
        return customName ? customName : propertyName.toLowerCase();
    }

    public tableName(entityName: string, customName: string | undefined): string {
        return customName ? customName : entityName.toLowerCase();
    }

    public joinColumnName(relationName: string, referencedColumnName: string): string {
        return referencedColumnName.toLowerCase();
    }
}

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [NcClassification, Survey, Question, NonConformity, Escalation],
    subscribers: [],
    migrations: [],
    namingStrategy: new CustomNamingStrategy()
})

export async function initializeDataSource() {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource;
}