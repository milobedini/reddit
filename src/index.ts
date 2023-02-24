import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init({
    // Entities are db tables e.g. Post
    entities: [Post],
    dbName: "reddit",
    user: "postgres",
    password: "Thelionshar3",
    type: "postgresql",
    debug: !__prod__,
  });

  //   This creates an instance, doesnt put in db
  const post = orm.em.create(Post, {
    title: "my first post",
  });
  console.log("sql");
  //   This adds it
  await orm.em.persistAndFlush(post);
};
main().catch((err) => {
  console.error(err);
});
