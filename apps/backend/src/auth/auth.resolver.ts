import {
  ObjectType,
  Field,
  Resolver,
  Mutation,
  InputType,
  Args
} from "@nestjs/graphql";

import { AuthService } from "./auth.service";

@InputType()
class LoginInput {
  @Field()
  nameOrEmail!: string;
  @Field()
  password!: string;
}

@ObjectType()
class LoginOutput {
  @Field()
  session!: string;
}

@Resolver()
export class AuthResolver {
  constructor(private svc: AuthService) {}
  @Mutation(() => LoginOutput)
  async loginLocal(@Args(`input`) input: LoginInput) {
    const user = await this.svc.validateUserLocal(
      input.nameOrEmail,
      input.password
    );
    return {
      session: await this.svc.signSession({
        uid: user.id,
        name: user.name,
        email: user.email
      })
    } as LoginOutput;
  }
}
