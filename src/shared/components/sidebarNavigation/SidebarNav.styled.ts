import { styled, Button } from '@mui/material';

export const SidebarList = styled('div')({
  marginBottom: '43px',
});

export const StyledTextButton = styled(Button)<{ active?: number }>(({ theme, active = 0 }) => ({
  fontSize: '15px',
  marginRight: '16px',
  fontWeight: active ? 800 : 500,
  width: '170px',
  padding: '10px',
  textAlign: 'left',
  display: 'flex',
  justifyContent: 'flex-start',
  textTransform: 'none',
  gap: '12px',
  color: active ? theme.palette.accentColor : theme.palette.mainBlack,
  marginBottom: '12px',
  '&.MuiButtonGroup-grouped:not(:last-of-type)': {
    border: 'none'
  }
}));

export const AdminMenu = styled('div')({
  marginBottom: '43px',
});

export const StyledSubtitle = styled('h2')(({ theme }) => ({
  color: theme.palette.mainBlack,
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: '36px',
  marginBottom: '16px',
}));
