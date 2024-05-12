import {
  InputType,
  Int,
  Field,
  OmitType,
  PartialType,
  ObjectType,
} from '@nestjs/graphql';
import { UserModel } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PartialType(
  OmitType(UserModel, ['id', 'createdAt', 'updatedAt'] as const),
) {
  @Field(() => String)
  authId?: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
}
