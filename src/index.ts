import "reflect-metadata";
import express from "express";
import mikroOrmConfig from "./mikro-orm.config";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";

const main = async () => {
  // initialise database
  // -------------------
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  // // reset schema
  // // ------------
  // const generator = orm.getSchemaGenerator();
  // await generator.dropSchema();
  // await generator.createSchema();
  // await generator.updateSchema();

  // // "normal" mikroORM way of creating/persisting/flushing entities
  // // --------------------------------------------------------------
  // const post = orm.em.create(Post, { title: "my first post" });
  // await orm.em.persistAndFlush(post);
  // await orm.em.nativeInsert(Post, {title: "my first post2"});
  // await orm.em.persistAndFlush(orm.em.create(Post, { title: "my third post" }));
  // const posts = await orm.em.find(Post, {});
  // console.log(posts);

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  // connect redis session to express (prior to apollo config)
  // - order of middleware = order to run
  // - make sure to run redis-server
  // ---------------------------------------------------------
  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 year cookie
        httpOnly: true, // makes cookie unretrievable on frontend
        secure: __prod__, // https only
        sameSite: "lax", // csrf(??)
      },
      secret: "hamburger",
      resave: false,
      saveUninitialized: false,
    })
  );

  // apollo server (GraphQL endpoints)
  // ---------------------------------
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000");
  });

  // end main()
};

main().catch((err) => {
  console.error(err);
});
