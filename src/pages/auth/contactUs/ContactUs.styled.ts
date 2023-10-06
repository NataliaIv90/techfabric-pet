import { styled } from '@mui/material';

export const StyledLink = styled('a')(({ theme }) => ({
  color: theme.palette.mainBlack,
  fontSize: '16px',
}));

export const StyledParagraph = styled('p')(({ theme }) => ({
  color: theme.palette.mainBlack,
  fontSize: '16px',
  marginBottom: '15px',
}));

export const StyledDiv = styled('div')({
  margin: '0 auto',
  fontFamily: 'Archivo',
});