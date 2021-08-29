interface Article {
  id?: string;
  title: string;
  content: string;
}

interface IBodyArticle {
  title?: string;
  content?: string;
}

export { Article, IBodyArticle };
