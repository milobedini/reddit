import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

// See Docs for boilerplates
// ObjectType to make the class a type that is usable in the resolver
@ObjectType()
@Entity()
export class Post {
  // Field exposes to schema.
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  // If you left out field here, will remain private to server and will not be request-able.
  @Field()
  @Property({ type: "text" })
  title!: string;
}
