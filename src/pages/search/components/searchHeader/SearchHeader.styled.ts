import { ToggleButton, styled } from '@mui/material';

export const SearchHeaderContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 42px;
`;

export const SearchResults = styled('h1')`
  color: ${({ theme }) => theme.palette.mainBlack};
  margin: 0;
`;

export const SortList = styled('ul')`
  display: flex;
  gap: 50px;
`;

export const SortButton = styled(ToggleButton)`
  justify-content: start;
  background-color: inherit !important;
  color: ${({ theme }) => theme.palette.mainBlack} !important;
`;
