import { FastifyPluginAsync } from "fastify";
import { getRepository, Repository, UpdateResult } from "typeorm";

import { Article } from "@/Interfaces/article";
//import { addArticle as addArticleTypes, findAllArticle } from "@/Types/article";

import { Article as ArticleEntity } from "../../entity/Article";

type paramsId = { id: string };

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

  fastify.get<{ Params: paramsId }>(
    "/byId/:id",
    async function (request, reply) {
      try {
        const idArticle: string = request.params.id;
        const repositoryArticle: Repository<ArticleEntity> =
          await getRepository(ArticleEntity);

        const findArticleById: Article | undefined =
          await repositoryArticle.findOne(idArticle);

        if (!findArticleById) {
          reply.notFound("Article not found");
        }

        return { result: findArticleById };
      } catch (err) {
        reply.internalServerError(err);
      }
    }
  );

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

  fastify.put<{ Body: Article; Params: paramsId }>(
    "/update/:id",
    async function (request, reply) {
      try {
        const article: Article = request.body;
        const idArticle: string = request.params.id;
        const repositoryArticle: Repository<ArticleEntity> =
          getRepository(ArticleEntity);

        const updateArticle: UpdateResult = await repositoryArticle.update(
          { id: idArticle },
          article
        );

        return { result: updateArticle };
      } catch (err) {
        reply.internalServerError(err.message);
      }
    }
  );
};

export default article;
