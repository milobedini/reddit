import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  // run migrations
  await orm.getMigrator().up();

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

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    // context accessible for all resolvers
    // Have to use fork (orm update since tutorial)
    context: () => ({ em: orm.em.fork() }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });
  // Now have GraphQL endpoint on Express

  app.listen(4000, () => {
    console.log(`Server started on localhost 4000`);
  });
};
main().catch((err) => {
  console.error(err);
  return err;
});
