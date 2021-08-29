import fastifyEnv, { fastifyEnvOpt } from "fastify-env";
import fp from "fastify-plugin";

const options: fastifyEnvOpt = {
  schema: {},
  dotenv: true,
};

export default fp<fastifyEnvOpt>(async (fastify, _opts) => {
  fastify.register(fastifyEnv, options);
});

declare module "fastify" {
  interface FastifyInstance {
    config: {
      dotenv: object | boolean;
      schema: {};
    };
  }
}
