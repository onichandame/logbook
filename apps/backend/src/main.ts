import { NestFactory } from "@nestjs/core";
import { Logger, Module, DynamicModule } from "@nestjs/common";
import { ConfigService, ConfigModule } from "@libs/config";

import { AppModule } from "./app.module";

@Module({})
class RootModule {
  static forRoot(mod: any): DynamicModule {
    return { module: RootModule, imports: [ConfigModule, mod] };
  }
}

const logger = new Logger(__filename);

const bootstrap = async () => {
  const app = await NestFactory.create(RootModule.forRoot(AppModule));
  const config = app.get(ConfigService);
  const port = config.get<string>(`PORT`) || 80;
  await app.listen(port);
  logger.log(`listening on port ${port}`);
};

bootstrap();
