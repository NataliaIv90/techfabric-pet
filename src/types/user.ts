export interface IBasicUserData {
  id: string;
  role: string;
}
export interface IAvatar {
  id: string;
  image: string;
  contentType: string;
}

export interface ICurrentUserResponse extends IBasicUserData {
  email: string;
  userName: string;
  name: string;
  surname: string;
  avatar: IAvatar | null;
}

export interface IUsersToUpdate {
  userId: string;
  role: string;
  userName?: string;
}

export interface ISearchUserProps {
  keyword?: string | null;
  userRole?: string | null;
}

export interface IUserListResponce {
  users: ICurrentUserResponse[];
  totalPages: number;
  currentPage: number;
}
