import { Module } from "@nestjs/common";
import { ConfigModule } from "./config";

import { SqliteModule } from "./db-connection";

@Module({ imports: [SqliteModule, ConfigModule] })
export class AppModule {}
