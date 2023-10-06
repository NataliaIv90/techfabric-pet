import { styled } from '@mui/material';

export const ArticlePreview = styled('div')<{ inFullInfo?: boolean; hasComments?: boolean }>(
  ({ theme, inFullInfo, hasComments }) => ({
    background: theme.palette.mainColor,
    padding: '32px 24px',
    border: `1px solid ${theme.palette.strokeGrey}`,
    borderRadius: `${inFullInfo ? 'none' : '8px'}`,
    borderTopLeftRadius: `${inFullInfo ? '8px' : ''}`,
    borderTopRightRadius: `${inFullInfo ? '8px' : ''}`,
    borderBottom: `${inFullInfo && hasComments ? 'none' : ''}`,
  })
);

export const ArticleImage = styled('div')<{ mainImage: string }>(({ mainImage }) => ({
  backgroundImage: `url(${mainImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: '100%',
  aspectRatio: '100/42',
}));
