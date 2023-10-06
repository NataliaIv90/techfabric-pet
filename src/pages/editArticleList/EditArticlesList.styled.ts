import { styled, Button, TableRow } from '@mui/material';

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

export const ArticlesListContainer = styled('div')({
  padding: '30px 0',
  overflowWrap: 'anywhere',
});

export const PaginationContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});

export const StyledListHeaderContainer = styled('div')({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '80% 20%',
  gap: '15px',
})

export const RefreshButton = styled(Button)({
  textTransform: 'none',
  '&::before': {
    height: '23px',
    content: '""',
    width: '0px',
    overflow: 'hidden',
    opacity: '0',
    transition: 'all 0.2s',
    zIndex: '1',
  },
  '&:hover::before': {
    content: '"Refresh"',
    width: '100%',
    opacity: '1',
  }
});

export const ArticleTitle = styled('h3')(({ theme }) => ({
  color: theme.palette.mainBlack,
  fontSize: '15px',
  textDecoration: 'underline',
  '&:hover': {
    color: theme.palette.accentColor
  }
}));

export const ArticleImagePreview = styled('div')<{ mainImage: string; contentType: string }>(({ mainImage, contentType }) => ({
  backgroundImage: `url(data:${contentType};base64,${mainImage})`,
  width: '100%',
  aspectRatio: '100/42',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  borderRadius: '8px',
}));

export const StyledTableRow = styled(TableRow)({
  display: 'grid',
  gridTemplateColumns: '1.5fr 2fr 1fr 1fr 0.5fr'
})