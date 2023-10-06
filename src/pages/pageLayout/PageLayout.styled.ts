import { styled } from '@mui/material';

export const PageLayoutContainer = styled('div')`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`;

export const Main = styled('main')(({ theme }) => ({
  backgroundColor: theme.palette.secondaryBlack,
  gridRow: 2,
}));
