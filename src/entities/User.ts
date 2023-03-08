import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {
  // Field exposes to schema.
  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property({ type: "text", unique: true })
  username!: string;

  // No @Field so is never queried, just a db column.
  @Property({ type: "text" })
  password!: string;
}
