import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  // const post = orm.em.create(Post, { title: "my first post" });
  // await orm.em.persistAndFlush(post);
  // await orm.em.nativeInsert(Post, {title: "my first post2"});
  // await orm.em.persistAndFlush(orm.em.create(Post, { title: "my third post" }));
  // const posts = await orm.em.find(Post, {});
  // console.log(posts);

  const app = express()
  app.get('/', (_, res) => {
    res.send("hello")
  });
  app.listen(4000, () => {
    console.log('server started on http://localhost:4000')
  });
};
main().catch((err) => {
  console.error(err);
});
