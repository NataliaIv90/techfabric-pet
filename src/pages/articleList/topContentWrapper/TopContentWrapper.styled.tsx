import { styled } from '@mui/material'

export const TrendingContentContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  padding: '32px 24px',
  backgroundColor: theme.palette.mainColor,
  borderRadius: '8px',
  border: `2px solid ${theme.palette.strokeGrey}`,
}));

export const StyledSubtitle = styled('h2')(({ theme }) => ({
  color: theme.palette.mainBlack,
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: '36px',
  marginBottom: '16px',
}));

export const BrandColorSpan = styled('span')(({ theme }) => ({
  color: theme.palette.accentColor,
}));