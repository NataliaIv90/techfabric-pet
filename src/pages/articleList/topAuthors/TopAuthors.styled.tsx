import { styled } from '@mui/material';

export const TopAuthorItem = styled('div')({
  display: 'flex',
  marginBottom: '14px',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '10px',
});

export const AuthorIcon = styled('div')(({ theme }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  backgroundColor: theme.palette.accentColor,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '14px',
  fontWeight: 700,
  color: theme.palette.mainColor,
}));

export const AuthorName = styled('div')(({ theme }) => ({
  fontWeight: 700,
  fontSize: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '3px',
  textOverflow: 'ellipsis',
  overflowWrap: 'anywhere',
  color: theme.palette.mainBlack,
}));
