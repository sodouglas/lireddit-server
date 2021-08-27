import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType() // converts TS class to GraphQL type
@Entity()
export class Post {

  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "text" })
  title!: string;

  // // TODO: set author to a User
  // @Field(() => String)
  // @Property({ type: "text" })
  // author!: string;

  @Field(() => String)
  @Property()
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  // // https://mikro-orm.io/docs/entity-manager#persisting-and-cascading
  // const post = new Post('my first post')
  // constructor(title: string) {
  //   this.title = title;
  // }

}
