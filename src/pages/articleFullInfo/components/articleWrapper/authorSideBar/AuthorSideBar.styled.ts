import { styled } from '@mui/material';

export const AuthorSideBarContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const AuthorContainer = styled('div')`
  background-color: ${({ theme }) => theme.palette.mainColor};
  padding: 32px 24px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.strokeGrey};
`;
