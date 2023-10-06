import { LogoContainerStyled, SpanStyled, TextLogoStled } from './MainLogo.styled';
import { ReactComponent as LogoIcon } from '../../../../assets/icons/LogoIcon.svg';

interface IMainLogoProps {
  type: 'black' | 'white';
}

export const MainLogo = ({ type }: IMainLogoProps) => {
  return (
    <LogoContainerStyled>
      <LogoIcon
        width={44}
        height={44}
      />
      <TextLogoStled color={type}>
        <SpanStyled>Pixel</SpanStyled>Play
      </TextLogoStled>
    </LogoContainerStyled>
  );
};
