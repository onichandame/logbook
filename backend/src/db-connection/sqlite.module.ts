import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "../config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const isUnittest = () =>
          config.get<string>(`NODE_ENV`)?.includes(`test`);
        let database = config.get<string>(`DATABASE`);
        if (!database)
          if (isUnittest()) database = `:memory:`;
          else
            throw new Error(
              `database not specified! Make sure env DATABASE is set to the path of the database file!`
            );
        else database += `_v${config.get<number>(`database.sqlite.revision`)}`;
        return {
          synchronize: isUnittest() ? true : false,
          dropSchema: isUnittest() ? true : false,
          type: `sqlite`,
          database,
          autoLoadEntities: true
        };
      }
    })
  ]
})
export class SqliteModule {}
