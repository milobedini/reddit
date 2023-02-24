import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  // run migrations
  orm.getMigrator().up();

  // const em = orm.em.fork();
  // This creates an instance, doesnt put in db
  // const post = em.create(Post, {
  //   title: "my first post",
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // });
  // console.log("sql");
  // //   This adds it
  // await em.persistAndFlush(post);
  // const posts = await em.find(Post, {});
  // console.log(posts);
};
main().catch((err) => {
  console.error(err);
  return err;
});
