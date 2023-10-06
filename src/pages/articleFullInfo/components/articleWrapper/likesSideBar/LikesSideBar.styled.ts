import { styled } from '@mui/material';

export const ListIcons = styled('ul')`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 32px;
`;

export const IconButtonStyled = styled('button')<{ isLiked?: boolean }>`
  color: ${({ theme }) => theme.palette.mainBlack};
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font-size: inherit;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  & svg {
    color: ${({ theme, isLiked }) => (isLiked ? theme.palette.accentColor : theme.palette.mainBlack)};
  }
  & :hover,
  & :focus {
    color: ${({ theme, isLiked }) => (isLiked ? theme.palette.mainBlack : theme.palette.accentColor)};
  }
`;

export const CountSpan = styled('span')`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
`;
