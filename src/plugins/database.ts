import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { createConnection, ConnectionOptions } from "typeorm";
import "reflect-metadata";

import { Article as ArticleEntity } from "../entity/Article";

async function PluginTypeOrm(app: FastifyInstance) {
  app.register(async (_req, _reply, done) => {
    try {
      const options: ConnectionOptions = {
        type: "postgres",
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT!,
        username: process.env.DATABASE_ROOT_USERNAME,
        password: process.env.DATABASE_ROOT_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: true,
        logging: true,
        entities: [ArticleEntity],
        subscribers: ["src/subscriber/*.js"],
        migrations: ["src/migration/*.js"],
        cli: {
          entitiesDir: "src/entity",
          migrationsDir: "src/migration",
          subscribersDir: "src/subscriber",
        },
      };

      await createConnection(options);
      done();
    } catch (err) {
      throw err;
    }
  });
}

export default fp(PluginTypeOrm);
