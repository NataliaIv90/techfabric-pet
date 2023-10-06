import { ICommentResponse } from './comments';
import { IAvatar } from './user';

export interface IArticleCardProps {
  data: IArticlePreviewItemData;
}

export enum EArticleSortOptions {
  ByDate = 'byDate',
  ByAuthor = 'byAuthor',
  ByName = 'byName',
  TopRated = 'byRate',
  AllPostsList = 'defaultList',
}

export interface IAuthor {
  userName: string;
  name: string;
  surname: string;
  avatar: IAvatar;
}

interface ITag {
  name: string;
}

interface IAuthorArticle {
  name: string;
  tags: ITag[];
  id: string;
}

export interface IArticleFullInfoResponse {
  author: IAuthor;
  content: string;
  comments: ICommentResponse[];
  created: string;
  published: string;
  authorsArticles: IAuthorArticle[];
  name: string;
  mainImage: string;
  tags: { name: string }[];
  contentType: string;
  likes: number;
  hasCurrentUserLiked: boolean;
  gameType?: string;
  platform?: string;
  year?: number;
}

export interface IPublishArticleResponse {
  status: string;
  data?: string;
  error?: { error: string; status: string };
}

export interface ICreateArticleFormData {
  mainImage: string;
  name: string;
  gameType?: string | null;
  platform?: string | null;
  year?: number | null;
  tags?: string | null;
  description: string;
  content: string;
}

export interface IArticleFullData extends Omit<ICreateArticleFormData, 'tags' | 'year'> {
  contentType: string;
  year?: number | null;
  tags?: ITag[] | null;
}

export interface IArticlePreviewItemData extends Omit<ICreateArticleFormData, 'tags'> {
  id: string;
  author: IAuthor;
  tags: ITag[];
  contentType: string;
  created: string;
  published: string;
  likes?: number;
  hasCurrentUserLiked?: boolean;
}

export type TArticleData = Omit<ICreateArticleFormData, 'description'>;

export interface IResponseData {
  articles: IArticlePreviewItemData[];
  totalPages: number;
  currentPage: number;
}

export interface IResponse {
  status: string;
  data?: IResponseData;
  error?: { data: string; status: string };
}

export interface ITopTagResponse extends Omit<IResponse, 'data'> {
  data?: ITag[];
}

export interface ITopAuthorsResponse extends Omit<IResponse, 'data'> {
  data: IAuthor[];
}

export interface IImageUploadResponceData {
  url: string;
}

export interface IImageUploadResponse extends Omit<IResponse, 'data'> {
  data: IImageUploadResponceData;
}

// export enum EArticleRequestOrderProps {
//   ByDate = 'CreatedDate',
//   ByLikes = 'Likes',
// }

// export interface IRequestArticleListByPage {
//   page: number;
//   size: number;
//   order: EArticleRequestOrderProps;
// }
