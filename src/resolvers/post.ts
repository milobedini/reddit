import { Post } from "../entities/Post";
import { MyContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
  // GET ALL
  @Query(() => [Post])
  // Declare graphQL return type first
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  // GET ONE
  @Query(() => Post, { nullable: true })
  // Declare graphQL return type first, TS types below
  post(
    // Below name id, reflects the name of the identifier in the GraphQL schema.
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  // CREATE
  @Mutation(() => Post)
  // Declare graphQL return type first, TS types below
  async createPost(
    @Arg("title") title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = em.create(Post, {
      title: title,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await em.persistAndFlush(post);
    return post;
  }

  // UPDATE
  @Mutation(() => Post, { nullable: true })
  // Declare graphQL return type first, TS types below
  async updatePost(
    @Arg("id") id: number,
    @Arg("title") title: string,
    // Below if want to not have to update this field.
    //  @Arg("title", () => String, {nullable: true}) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { id });
    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      post.title = title;
      post.updatedAt = new Date();
      await em.persistAndFlush(post);
    }
    return post;
  }
}
