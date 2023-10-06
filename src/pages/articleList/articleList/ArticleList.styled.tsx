import { Button, styled } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

export const ArticleListWrapper = styled('div')({
  padding: '60px 3%',
  display: 'grid',
  gridTemplateColumns: '21% 51% 21%',
  gap: '3%',
});

export const MainSection = styled('div')({
  width: '100%',
  boxSizing: 'border-box',
});

export const StyledTextButton = styled(Button)<{ small?: number; active?: number, coloredactivebtn?: number }>(({ theme, small, active = 0, coloredactivebtn = false }) => ({
  fontSize: '15px',
  marginRight: '16px',
  fontWeight: active ? 800 : 500,
  width: small ? 'auto' : '170px',
  padding: `10px ${small ? '14px' : '10px'}`,
  textAlign: 'left',
  display: 'flex',
  justifyContent: 'flex-start',
  textTransform: 'none',
  gap: '12px',
  color: coloredactivebtn && active ? theme.palette.accentColor : theme.palette.mainBlack,
  marginBottom: small ? '0px' : '12px',
  border: 'none',
  '&.MuiButtonGroup-grouped:not(:last-of-type)': {
    border: 'none'
  }
}));

export const ArticleListHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const ArticleListHeaderLinks = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  gap: '16px',
});

export const ArticleListContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '20px',
  width: '100%',
});

export const TrendingContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const StyledMenuItem = styled(MenuItem)({
  fontSize: '15px',
  fontWeight: 500,
})

export const PaginationContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr 1fr'
});

export const ArticlePerPageButtonsContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '14px',
});

export const StyledArticlePageButton = styled(Button)<{ active?: number, coloredactivebtn?: number }>(({ theme, active = 0 }) => ({
  fontSize: '12px',
  marginRight: '16px',
  fontWeight: active ? 800 : 500,
  padding: '5px',
  color: active ? theme.palette.accentColor : theme.palette.mainBlack,
  border: active ? `1px solid ${theme.palette.accentColor}` : 'none',
}));
