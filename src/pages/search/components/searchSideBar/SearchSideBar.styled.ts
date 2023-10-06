import { ToggleButton, styled } from '@mui/material';

export const SearchButton = styled(ToggleButton)`
  justify-content: start;
  background-color: ${({ selected, theme }) => (selected ? theme.palette.accentColorLight : 'inherit')} !important;
  color: ${({ selected, theme }) => (selected ? theme.palette.accentColor : 'inherit')} !important;
`;
