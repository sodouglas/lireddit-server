import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Post {
  @PrimaryKey()
  id!:number;
  
  @Property({type: 'text'})
  title!: string;

  // Author

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  // const post = new Post('my first post')
  constructor(title: string) {
    this.title = title;
  }
}
