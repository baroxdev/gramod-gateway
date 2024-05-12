import { Field, ObjectType } from '@nestjs/graphql';
import TimestampScalar from 'src/graphql/scalars/timestamp';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'numeric',
  })
  id: string;
  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: number;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt: number;
}

@ObjectType()
export abstract class BaseModel {
  @Field(() => String)
  id: string;
  @Field(() => TimestampScalar)
  createdAt: number;
  @Field(() => TimestampScalar)
  updatedAt: number;
}
