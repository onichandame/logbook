import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ModelModule } from "@libs/model";

import { RawContext, Context } from "./types";
import { AuthModule, AuthService } from "./auth";
import { CrudModule } from "./crud";

@Module({
  imports: [
    ModelModule,
    AuthModule,
    GraphQLModule.forRootAsync({
      imports: [AuthModule],
      inject: [AuthService],
      useFactory: async (auth: AuthService) => {
        return {
          autoSchemaFile: true,
          context: async (ctx: RawContext): Promise<Context> => {
            const result: Context = { ...ctx };
            const authHeader = auth.parseHeader(
              ctx.req.header(`authorization`)
            );
            if (authHeader) {
              const session = await auth.validateSession(authHeader.session);
              const user = await auth.deserializeUser(session.uid);
              result.user = user;
            }
            return result;
          }
        };
      }
    }),
    CrudModule
  ]
})
export class AppModule {}
