import { Button, styled } from '@mui/material';

export const AuthorArticlesContainer = styled('div')`
  width: 100%;
  padding: 32px 0px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.strokeGrey};
  background-color: ${({ theme }) => theme.palette.mainColor};
`;

export const AuthorArticlesName = styled('h2')`
  padding: 0 24px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.palette.mainBlack};
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;
  & span {
    color: ${({ theme }) => theme.palette.accentColor};
  }
`;
export const ArticlesList = styled('ul')`
  display: flex;
  flex-direction: column;
`;
export const ArticleItem = styled('li')<{ borderBottom: boolean }>`
  padding: 8px 12px;
  border-bottom: ${({ borderBottom, theme }) => borderBottom && `1px solid ${theme.palette.strokeGrey}`};
`;

export const TextArticle = styled('p')`
  color: ${({ theme }) => theme.palette.mainBlack};
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  width: 100%;
  word-wrap: break-word;
  text-align: start;
`;
export const TagsList = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: ${({ theme }) => theme.palette.mainGrey};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const NameArticleButton = styled(Button)`
  width: 100%;
  display: flex;
  align-items: start;
  flex-direction: column;
  text-transform: none;
`;
