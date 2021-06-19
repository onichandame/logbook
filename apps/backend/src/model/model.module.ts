import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import * as Models from "./models";

@Module({
  imports: [TypeOrmModule.forFeature(Object.values(Models))]
})
export class ModelModule {}
