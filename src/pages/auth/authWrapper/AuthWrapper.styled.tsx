import { styled } from '@mui/material';

interface IPageStyleProps {
  isNarrow: boolean;
}

export const StyledAuthWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.secondaryBlack,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const StyledComponentWrapper = styled('div')<IPageStyleProps>(({ theme, isNarrow }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  width: '800px',
  backgroundColor: theme.palette.mainColor,
  margin: '72px 0',
  padding: '52px 140px',
  border: `2px solid ${theme.palette.strokeGrey}`,
  borderRadius: '8px',
  maxWidth: isNarrow ? '600px' : '800px',
}));

export const StyledHeader = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px',
  margin: '0 auto',
});

export const StyledImage = styled('img')<IPageStyleProps>(({ isNarrow }) => ({
  height: 'auto',
  width: '115px',
  display: isNarrow ? 'none' : 'block',
}));

export const StyledSubtitle = styled('div')({
  fontFamily: 'Archivo',
  padding: '0 16px',
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '24px',
  textAlign: 'center',
  whiteSpace: 'pre-line',
});

export const StyledFormWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  flexDirection: 'column',
  gap: '36px',
});

export const StyledForm = styled('form')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  flexDirection: 'column',
  gap: '28px',
  width: '100%',
});

export const BrandText = styled('span')<IPageStyleProps>(({ isNarrow }) => ({
  fontWeight: '700',
  fontFamily: '"Archivo", sans-serif',
  textAlign: 'center',
  fontSize: isNarrow ? '24px' : '52px',
  lineHeight: isNarrow ? '36px' : '72px',
}));

export const BrandColorSpan = styled('span')(({ theme }) => ({
  color: theme.palette.accentColor,
}));

export const StyledLabelLine = styled('div')({
  position: 'absolute',
  width: '100%',
  top: '12px',
  borderBottom: '2px solid black',
  fontFamily: 'Archivo',
  fontWeight: '400',
});

export const StyledLabelTextContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});

export const StyledLabelText = styled('div')({
  backgroundColor: '#fff',
  padding: '0 10px',
  zIndex: '2',
  fontSize: '16px',
});

export const StyledErrorMessage = styled('p')(({ theme }) => ({
  color: theme.palette.errorColor,
  fontSize: '16px',
}));