import {
  StyledAuthWrapper,
  StyledComponentWrapper,
  StyledHeader,
  StyledImage,
  StyledSubtitle,
  BrandColorSpan,
  BrandText
} from './AuthWrapper.styled';
import logoSmImage from '../../../assets/icons/LogoIcon.svg';
import { Box } from '@mui/material';
import { PropsWithChildren, ReactElement } from 'react';

interface IAuthWrapperComponent {
  title: string;
  text: string;
  children: ReactElement;
  islogoInText?: boolean;
  isNarrow?: boolean;
}

export const AuthWrapperComponent = (
  { title,
    text,
    children,
    islogoInText,
    isNarrow = false }: PropsWithChildren<IAuthWrapperComponent>
) => (
  <StyledAuthWrapper>
    <StyledComponentWrapper
      isNarrow={isNarrow}
      sx={{
        gap: text.length ? '60px' : '40px',
      }}>
      <StyledHeader>

        <StyledImage isNarrow={isNarrow} src={logoSmImage} alt='Logo image' />

        <BrandText isNarrow={isNarrow}>
          {title}
          <Box sx={{ display: islogoInText ? 'inline' : 'none' }}>
            <BrandColorSpan>Pixel</BrandColorSpan>Play
          </Box>
        </BrandText>

        {text.length
          ? (<StyledSubtitle> {text} </StyledSubtitle>)
          : null}

      </StyledHeader>

      {children}

    </StyledComponentWrapper>

  </StyledAuthWrapper >
)
