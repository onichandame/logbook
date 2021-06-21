import { Module } from "@nestjs/common";
import { ModelModule } from "@libs/model";

import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";

@Module({
  imports: [ModelModule],
  providers: [AuthService, AuthResolver],
  exports: [AuthService]
})
export class AuthModule {}
