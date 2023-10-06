import { styled } from '@mui/material';

export const CommentsContainer = styled('div')`
  padding: 52px 24px;
  border-radius: 0px 0px 8px 8px;
  border: 1px solid ${({ theme }) => theme.palette.strokeGrey};
  background-color: ${({ theme }) => theme.palette.mainColor};
`;
