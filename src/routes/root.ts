import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.register(import("./article/index"), { prefix: "/api/v1/article" });
};

export default root;
