import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import 'reflect-metadata';
import mikroOrmConfig from "./mikro-orm.config";

const main = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);

    const post = orm.em.create(Post, {title: 'my first post'});
    // same: const post = new Post('my first post')
    await orm.em.persistAndFlush(post);
    console.log('----------sql2----------');
    await orm.em.nativeInsert(Post, {title: 'my first post2'});
}

main().catch((err) => {
    console.error(err);
});