import { ID, InputType, Field } from "@nestjs/graphql";
import { IsString, Length } from "class-validator";
import { Models, ExcludeGenerated } from "@libs/model";

@InputType()
export class LocalCredentialCreate
  implements ExcludeGenerated<Models.LocalCredential>
{
  @Field(() => ID)
  @IsString()
  user!: Models.User;
  @Field()
  @IsString()
  @Length(6, 20)
  password!: string;
}

@InputType()
export class LocalCredentialUpdate
  implements Partial<ExcludeGenerated<Models.LocalCredential>>
{
  @Field()
  @IsString()
  @Length(6, 20)
  password!: string;
}
