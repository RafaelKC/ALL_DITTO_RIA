import {DataSource, DefaultNamingStrategy, NamingStrategyInterface} from "typeorm";
import {NcClassification} from "@/entities/NcClassification";
import {Survey} from "@/entities/Survey";
import {Question} from "@/entities/Question";
import {Nc} from "@/entities/Nc";
import {Escalation} from "@/entities/Escalation";

class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    columnName(propertyName: string, customName: string | undefined, embeddedPrefixes: string[]): string {
        return customName ? customName : propertyName.toLowerCase();
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
    entities: [NcClassification, Survey, Question, Nc, Escalation],
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