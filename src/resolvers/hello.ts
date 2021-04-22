import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
    @Query(() => String)
    hello() {
        return "changed to something else in hello.ts"
    }
}