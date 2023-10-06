import { styled } from '@mui/material';

export const StyledModal = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.mainColor,
  borderRadius: '8px',
  border: `2px solid ${theme.palette.accentColor}`,
  padding: '2%'
}));