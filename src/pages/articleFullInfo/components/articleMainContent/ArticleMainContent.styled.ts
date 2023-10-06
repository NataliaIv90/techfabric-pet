import { styled } from '@mui/material';

export const ArticleContainer = styled('div')``;

export const ArticleImage = styled('img')`
  width: 100%;
`;

export const ArticleName = styled('h1')`
  color: ${({ theme }) => theme.palette.mainBlack};
  font-size: 52px;
  font-style: normal;
  font-weight: 700;
  line-height: 78px;
`;
