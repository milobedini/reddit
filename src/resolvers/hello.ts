import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  // Declare return type first
  hello() {
    return "Hello World!";
  }
}
