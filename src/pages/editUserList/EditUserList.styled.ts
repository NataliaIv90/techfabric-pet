import { styled, MenuItem, Button, TextField } from '@mui/material';

export const ContentContainer = styled('div')({
  padding: '60px 3%',
  display: 'grid',
  gridTemplateColumns: '20% 71%',
  gap: '3%',
  width: '100%',
  boxSizing: 'border-box'
});

export const Main = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: '24px ',
  flexDirection: 'column',
  gap: '20px',
  background: theme.palette.mainColor,
  border: `1px solid  ${theme.palette.strokeGrey}`,
  borderRadius: '8px',
}));

export const StyledTitle = styled('h1')({
  fontSize: '42px',
  lineHeight: '56px',
  margin: 0,
  fontWeight: '700',
});

export const StyledSubtitle = styled('h2')(({ theme }) => ({
  color: theme.palette.mainBlack,
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: '36px',
  marginBottom: '16px',
}));

export const SearchForm = styled('form')({
  display: 'flex',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  gap: '24px',
});

export const SearchBar = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  flexWrap: 'wrap',
  gap: '20px',
});

export const StyledMenuItem = styled(MenuItem)({
  fontSize: '15px',
  fontWeight: 500,
  padding: '5px',
});

export const StyledButton = styled(Button)({
  padding: '5px 12px',
  textTransform: 'none'
});

export const StyledInput = styled(TextField)({
  height: '100%',
  width: '280px'
});

export const UserListContainer = styled('div')({
  padding: '30px 0'
});

export const ButtonContainer = styled('div')({
  marginTop: '5%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  padding: '0 25%',
  gap: '30px',
});

export const SingleButtonContainer = styled('div')({
  paddingTop: '1%',
  width: '30%',
  margin: '0 auto',
});

export const StyledNotification = styled('p')(({ theme }) => ({
  color: theme.palette.errorColor,
  fontSize: '15px',
  paddingTop: '15px'
}));

export const PaginationContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});
