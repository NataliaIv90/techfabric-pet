import { Avatar, css, styled } from '@mui/material';

export const AvatarContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 16px;
`;
export const AuthorInfo = styled('div')<{ type?: string }>`
  flex-wrap: wrap;
  text-align: start;
  ${({ type }) =>
    type === 'comment'
      ? css`
          display: flex;
          gap: 4px;
        `
      : css``}
`;

export const AvatarAuthorStyled = styled(Avatar)<{ type?: string }>`
  ${({ type }) =>
    type === 'comment'
      ? css`
          width: 42px;
          height: 42px;
        `
      : css`
          width: 72px;
          height: 72px;
        `}
  background-color: ${({ theme }) => theme.palette.accentColor};
`;

export const TextAvatar = styled('p')<{ type?: string }>`
  color: ${({ theme }) => theme.palette.mainBlack};
  ${({ type }) =>
    type === 'comment'
      ? css`
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: 24px;
        `
      : css`
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: 36px;
        `}
`;

export const DateText = styled('p')<{ type?: string }>`
  color: ${({ theme }) => theme.palette.mainGrey};
  margin-top: ${({ type }) => (type === 'comment' ? '4px' : '24px')};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;
