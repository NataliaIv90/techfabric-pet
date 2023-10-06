import { Button, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const ArticlesSearchList = styled('ul')`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const UsersSearchList = styled('ul')`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  gap: 20px;
`;

export const UserItem = styled('li')`
  width: calc(100% / 3 - 40px);

  display: flex;
  justify-content: center;

  background-color: ${({ theme }) => theme.palette.mainColor};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.strokeGrey};
`;

export const UserButton = styled(Button)`
  width: 100%;
  text-transform: none;
`;

export const CommentsSearchList = styled('ul')`
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  & li {
    background-color: ${({ theme }) => theme.palette.mainColor};
    &:hover,
    &focus {
      background-color: ${({ theme }) => theme.palette.accentColorLight};
    }
  }
`;

export const CommentNavLink = styled(NavLink)`
  width: calc(100% / 3 - 20px);
  border-radius: 8px;
`;

export const TagsSearchList = styled('ul')`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

export const TagButton = styled(Button)`
  width: 100%;
  text-transform: none;
`;
