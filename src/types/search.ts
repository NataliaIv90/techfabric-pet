import { IArticlePreviewItemData } from './article';
import { ICommentResponse } from './comments';
import { IAvatar } from './user';

export enum ECategory {
  Articles = 'articles',
  Users = 'users',
  Tags = 'tags',
  Comments = 'comments',
}

export enum EOrder {
  Order = 'createdDate',
}
export enum EParameter {
  Relevant = 'relevant',
  LastPosts = 'lastposts',
  NewPosts = 'newposts',
}

export interface IRequestSearchData {
  query: string;
  category: ECategory;
  order?: EOrder;
  parameters: EParameter;
}

export interface IResponseArticles {
  articles: IArticlePreviewItemData[];
  currentPage: number;
  totalPage: number;
}
export interface IResponseUser {
  userName: string;
  name: string;
  surname: string;
  avatar: IAvatar;
}

export interface IResponseUsers {
  users: IResponseUser[];
}
export interface IResponseTag {
  name: string;
  posts: number;
}

export interface IResponseTags {
  tags: IResponseTag[];
}

export interface IResponseComments {
  comments: ICommentResponse[];
}
