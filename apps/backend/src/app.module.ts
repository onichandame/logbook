import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ModelModule } from "@libs/model";

import { CrudModule } from "./crud";

@Module({
  imports: [
    ModelModule,
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    CrudModule
  ]
})
export class AppModule {}
