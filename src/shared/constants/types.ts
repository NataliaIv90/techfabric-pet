export enum EArticleRequestOrderProps {
  ByDate = 'CreatedDate',
  ByLikes = 'Likes',
}

export interface IPagination {
  page: number;
  size: number;
  order?: EArticleRequestOrderProps;
}
