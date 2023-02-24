import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  // Entities are db tables e.g. Post
  migrations: {
    path: path.join(__dirname, "./migrations/*"), // path to the folder with migrations
    glob: "!(*.d).{js,ts}",
  },
  entities: [Post],
  dbName: "reddit",
  user: "postgres",
  password: "Thelionshar3",
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
