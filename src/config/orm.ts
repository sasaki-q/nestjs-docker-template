import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getMetadataArgsStorage } from 'typeorm';

type DatabaseConfig = {
    DB_PORT: number;
    DB_HOST: string;
    DB_USER: string;
    DB_NAME: string;
    DB_PASS: string;
}

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        const service = new ConfigService<DatabaseConfig>();

        return {
            type: 'postgres',
            port: service.get("DB_PORT"),
            host: service.get("DB_HOST"),
            username: service.get("DB_USER"),
            password: service.get("DB_PASS"),
            database: service.get("DB_NAME"),
            entities: getMetadataArgsStorage().tables.map((e) => e.target),
            synchronize: false,
        }
    }
}