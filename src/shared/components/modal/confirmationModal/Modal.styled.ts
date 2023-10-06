import { styled } from '@mui/material';

export const StyledBtnContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  marginTop: '15px',
  padding: '0 10%',
  gap: '15px',
});


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


export const StyledModalTitle = styled('h2')(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 700,
  color: theme.palette.accentColor,
  marginBottom: '15px',
}));