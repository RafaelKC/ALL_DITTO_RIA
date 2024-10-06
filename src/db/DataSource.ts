import {DataSource, DefaultNamingStrategy, NamingStrategyInterface} from "typeorm";
import {NcClassification} from "@/entities/NcClassification";
import {Survey} from "@/entities/Survey";
import {Question} from "@/entities/Question";
import {NonConformity} from "@/entities/NonConformity";
import {Escalation} from "@/entities/Escalation";

class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    public columnName(propertyName: string, customName: string | undefined, embeddedPrefixes: string[]): string {
        return customName ? customName : propertyName.toLowerCase();
    }

    public tableName(entityName: string, customName: string | undefined): string {
        return customName ? customName : entityName.toLowerCase();
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