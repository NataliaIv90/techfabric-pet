import { styled, Typography, Button } from '@mui/material';

export const Card = styled('div')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.mainColor,
  borderRadius: '8px',
  border: `2px solid ${theme.palette.strokeGrey}`,
  boxSizing: 'border-box',
  overflow: 'hidden'
}));

export const ArticleImage = styled('div')<{ mainImage: string; contentType: string }>(({ mainImage, contentType }) => ({
  backgroundImage: `url(data:${contentType};base64,${mainImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: '100%',
  aspectRatio: '100/42',
}));

export const ArticleInfo = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
});

export const ArticleContent = styled('div')({
  padding: '24px 56px',
});

export const AuthorIcon = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.accentColor,
  width: '44px',
  height: '44px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  color: theme.palette.mainColor,
}));

export const AuthorName = styled('p')(({ theme }) => ({
  fontWeight: 700,
  fontSize: '16px',
  color: theme.palette.mainBlack,
  overflowWrap: 'anywhere',
}));

export const ArticleDate = styled('p')(({ theme }) => ({
  color: theme.palette.mainGrey,
  fontWeight: 400,
  fontSize: '16px',
}));

export const ArticleTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 700,
  lineHeight: '48px',
  textAlign: 'left',
  margin: '16px 0 10px',
  color: theme.palette.mainBlack,
  overflowWrap: 'anywhere',
}));

export const ArticleDescription = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 500,
  textAlign: 'left',
  margin: '5px 0',
  color: theme.palette.mainBlack,
  opacity: 0.9,
  overflowWrap: 'anywhere',
}));

export const GameDetaiils = styled('p')({
  fontSize: '16px',
  fontWeight: 400,
  textAlign: 'left',
  margin: '14px 0',
});

export const ArticleFooter = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const ArticleTags = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '3px',
});

export const TagItem = styled('span')(({ theme }) => ({
  color: theme.palette.mainGrey,
  padding: '0 6px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 400,
  textDecoration: 'none',
}));

export const LikeBtn = styled(Button)({
  padding: '10px',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  textTransform: 'none',
  gap: '12px',
});

export const ButtonText = styled('span')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  color: theme.palette.mainGrey,
}));

export const DetailsTitle = styled('span')(({ theme }) => ({
  color: theme.palette.mainGrey,
}))

export const DetailsValue = styled('span')(({ theme }) => ({
  color: theme.palette.mainBlack,
  opacity: 0.9,
  fontWeight: 600,
  overflowWrap: 'anywhere',
}))