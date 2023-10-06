import { Button, styled } from '@mui/material';
export const PaginationContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
`;

export const PerPageButtonsContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;

export const PageButton = styled(Button)<{ active?: number; coloredactivebtn?: number }>(({ theme, active = 0 }) => ({
  fontSize: '12px',
  marginRight: '16px',
  fontWeight: active ? 800 : 500,
  padding: '5px',
  color: active ? theme.palette.accentColor : theme.palette.mainBlack,
  border: active ? `1px solid ${theme.palette.accentColor}` : 'none',
}));
