import { QueryResult } from "pg";
import { Article } from "@/Interfaces/article";

type findAllArticle = QueryResult<Article>;
type addArticle = QueryResult<Article>;

export { findAllArticle, addArticle };
