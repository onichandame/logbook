import { ConfigModule as CM } from "@nestjs/config";
import { Module } from "@nestjs/common";

import { configFactory } from "./config.data";
import { ConfigService } from "./config.service";

@Module({
  imports: [CM.forRoot({ load: [configFactory] })],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}
