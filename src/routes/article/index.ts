import { FastifyPluginAsync } from "fastify";
import { getRepository, Repository } from "typeorm";

import { Article } from "@/Interfaces/article";
//import { addArticle as addArticleTypes, findAllArticle } from "@/Types/article";

import { Article as ArticleEntity } from "../../entity/Article";

const article: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/all", async function (request, reply) {
    try {
      const repositoryArticle: Repository<ArticleEntity> =
        getRepository(ArticleEntity);

      const getArticle: Article[] = await repositoryArticle.find();

      if (!getArticle.length) {
        throw "0 article found";
      }

      return { result: getArticle };
    } catch (err) {
      if (err === "0 article found") {
        reply.notFound("0 article found");
      }

      reply.internalServerError();
    }
  });

  fastify.post<{ Body: Article }>("/", async function (request, reply) {
    try {
      const repositoryArticle: Repository<ArticleEntity> =
        getRepository(ArticleEntity);
      const paramArticle: Article = request.body;

      const createArticle = await repositoryArticle.create(paramArticle);
      await createArticle.save();
      return { result: createArticle };
    } catch (err) {
      reply.internalServerError(err.message);
    }
  });
};

export default article;
