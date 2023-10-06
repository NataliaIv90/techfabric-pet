import { styled, TextField, Button } from '@mui/material';

export const CreateArticleWrapper = styled('div')({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '40px',
  padding: '20px 5%'
});

export const ContentContainer = styled('div')({});

export const ArticleFormContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mainColor,
}));

export const FormBorder = styled('div')(({ theme }) => ({
  width: '100%',
  border: `1px solid ${theme.palette.strokeGrey}`,
  borderBottom: 'none',
  borderRadius: '5px 5px 0 0',
  display: 'flex',
  justifyContent: 'flex-start',
  gap: '10px',
  flexDirection: 'column',
  boxSizing: 'border-box',
  padding: '24px',
}));

export const StyledInput = styled(TextField)(({ theme }) => ({
  '&.MuiFormControl-root': {
    width: '100%',
    overflowWrap: 'anywhere',
  },
  '& .MuiInputBase-input': {
    fontSize: '15px',
    fontWeight: 500,
    padding: '10px 12px',
    marginTop: '10px',
    '&::placeholder': {
      color: theme.palette.mainGrey,
      fontFamily: 'Archivo',
      fontWeight: 500,
    },
  },
}));

export const StyledInputLarge = styled(StyledInput)({
  '& .MuiInputBase-input': {
    fontSize: '52px',
    overflowWrap: 'anywhere',
  },
});

export const ImageInputContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  gap: '40px',
});

export const ButtonsContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '40px',
  paddingTop: '40px',
  paddingBottom: '28px',
});

export const ImageInputLabel = styled('label')(({ theme }) => ({
  color: theme.palette.mainGrey,
  fontWeight: 400,
  fontSize: '16px',
}));

export const ErrorMessage = styled('p')(({ theme }) => ({
  color: theme.palette.errorColor,
  fontWeight: 400,
  fontSize: '14px',
}));

export const HiddenInput = styled('input')({
  display: 'none',
})

export const StyledButton = styled(Button)({
  textTransform: 'none',
})

export const ImageBtnContainer = styled('div')({
  margin: '0 auto',
})

export const ImagePreview = styled('div')<{ image: string }>(({ image }) => ({
  display: image ? 'block' : 'none',
  margin: '0 auto',
  marginTop: '15px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  height: '50px',
  aspectRatio: '100/42',
}));
