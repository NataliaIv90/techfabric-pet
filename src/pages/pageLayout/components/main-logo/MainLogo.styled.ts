import { styled } from '@mui/material';

export const LogoContainerStyled = styled('div')`
  display: flex;
  gap: 24px;
  align-items: center;
`;

interface ITextProp {
  color: string;
}

export const TextLogoStled = styled('p')<ITextProp>`
  font-size: 40px;
  font-style: italic;
  font-weight: 700;
  line-height: 36px;
  color: ${({ color, theme }) => (color === 'black' ? theme.palette.mainBlack : theme.palette.mainColor)};
`;

export const SpanStyled = styled('span')`
  color: ${({ theme }) => theme.palette.accentColor};
`;
