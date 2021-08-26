import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType() // converts to GraphQL
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryKey()
  id!:number;
  
  @Field(() => String)
  @Property({type: 'text'})
  title!: string;
  
  // Author
  
  @Field(() => String)
  @Property()
  createdAt: Date = new Date();
  
  @Field(() => String)
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  // // const post = new Post('my first post')
  // constructor(title: string) {
  //   this.title = title;
  // }
}
