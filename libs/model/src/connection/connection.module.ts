import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@libs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import * as Migrations from "./migration";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const isUnittest = () =>
          config.get<string>(`NODE_ENV`)?.includes(`test`);
        let database: string;
        if (isUnittest()) database = `:memory:`;
        else if (!config.get<string>(`DATABASE`))
          throw new Error(
            `database not specified! Make sure env DATABASE is set to the path of the database file!`
          );
        else
          database = `${config.get<string>(`DATABASE`)}_v${config.get<number>(
            `database.sqlite.revision`
          )}`;
        return {
          migrationsRun: true,
          migrations: Object.values(Migrations),
          synchronize: isUnittest(),
          dropSchema: isUnittest(),
          type: `sqlite`,
          database,
          autoLoadEntities: true
        };
      }
    })
  ]
})
export class ConnectionModule {}
