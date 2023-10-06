import { IAuthor } from './article';

export interface IRequestComment {
  content: string;
  commentId?: string;
  articleId: string;
}
export interface ICommentResponse {
  id?: string;
  articleId: string;
  content: string;
  createdAt: string;
  author: IAuthor;
  replies: string[];
}

export type TCommentCard = Omit<ICommentResponse, 'replies' | 'articleId'>;
