import { InputType, Field } from "@nestjs/graphql";
import { IsUrl, IsOptional, IsString, IsEmail, Length } from "class-validator";
import { Models, ExcludeGenerated } from "@libs/model";

@InputType()
export class UserCreate implements ExcludeGenerated<Models.User> {
  @Field()
  @IsString()
  @Length(5, 30)
  name!: string;
  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;
  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  avatar?: string;
}

@InputType()
export class UserUpdate implements Partial<ExcludeGenerated<Models.User>> {
  @Field({ nullable: true })
  @IsString()
  @Length(5, 30)
  @IsOptional()
  name?: string;
  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;
  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  avatar?: string;
}
