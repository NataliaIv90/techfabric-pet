import { styled, Button } from '@mui/material';

export const TagItem = styled(Button)(({ theme }) => ({
  display: 'block',
  marginBottom: '12px',
  color: theme.palette.mainBlack,
  padding: '5px 12px',
  textTransform: 'none',
  fontSize: '15px',
  fontWeight: 600,
  textDecoration: 'underline',
  textOverflow: 'ellipsis',
  overflowWrap: 'anywhere',
  '& hover': {
    cursor: 'pointer',
  }
}));