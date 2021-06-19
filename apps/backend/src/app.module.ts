import { Module } from "@nestjs/common";
import { ConfigModule } from "@backend/config";

import { SqliteModule } from "@backend/db-connection";

@Module({ imports: [SqliteModule, ConfigModule] })
export class AppModule {}
