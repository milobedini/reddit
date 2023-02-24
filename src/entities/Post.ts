import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

// See Docs for boilerplates
@Entity()
export class Post {
  @PrimaryKey()
  id!: number;

  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ type: "text" })
  title!: string;
}
