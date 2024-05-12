import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { BaseModel } from 'src/base/base.entity';

@ObjectType({
  isAbstract: true,
})
@InputType({
  isAbstract: true,
})
export class UserModel extends BaseModel {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  authId: string;

  @Field({
    nullable: true,
  })
  birthDate: Date | null;
}
