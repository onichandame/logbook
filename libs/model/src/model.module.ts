import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ConnectionModule } from "./connection";
import * as Models from "./models";

@Module({
  imports: [ConnectionModule, TypeOrmModule.forFeature(Object.values(Models))]
})
export class ModelModule {}
