import { NestFactory } from "@nestjs/core";
import { ConfigService, ConfigModule } from "@nestjs/config";
import { Logger, Module, DynamicModule } from "@nestjs/common";

import { AppModule } from "./app.module";

@Module({})
class RootModule {
  static forRoot(
    module: NonNullable<DynamicModule["imports"]>[number]
  ): DynamicModule {
    return { module: RootModule, imports: [ConfigModule, module] };
  }
}

const logger = new Logger(RootModule.name);

const bootstrap = async () => {
  const app = await NestFactory.create(RootModule.forRoot(AppModule));
  const config = app.get(ConfigService);
  const port = config.get<string>(`PORT`) || 3000;
  await app.listen(port);
  logger.log(`listening on port ${port}`);
};

bootstrap();
