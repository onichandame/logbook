import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { ConfigService } from "./config";

import { AppModule } from "./app.module";

const logger = new Logger(__filename);

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<string>(`PORT`) || 80;
  await app.listen(port);
  logger.log(`listening on port ${port}`);
};

bootstrap();
