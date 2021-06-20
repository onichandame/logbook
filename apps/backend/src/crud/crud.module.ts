import { NestjsQueryGraphQLModule } from "@nestjs-query/query-graphql";
import { NestjsQueryTypeOrmModule } from "@nestjs-query/query-typeorm";
import { Module } from "@nestjs/common";
import { Models } from "@libs/model";

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature(Object.values(Models))],
      resolvers: [
        {
          EntityClass: Models.User,
          DTOClass: Models.User,
          delete: { disabled: true }
        },
        {
          EntityClass: Models.LocalCredential,
          DTOClass: Models.LocalCredential,
          delete: { disabled: true }
        }
      ]
    })
  ]
})
export class CrudModule {}
