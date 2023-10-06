import { NavLink } from 'react-router-dom';
import { MainLogo } from '../main-logo/MainLogo';
import { FooterContainerStyled, FooterMainContentContainer, MainContentFooterContainerStyled } from './Footer.styled';
import { Copyright } from './copyright/Copyright';
import { Navigation } from './navigation/Navigation';
import { Social } from './social/Social';

export const Footer = () => {
  return (
    <FooterContainerStyled>
      <MainContentFooterContainerStyled>
        <NavLink to='/'>
          <MainLogo type='white' />
        </NavLink>
        <FooterMainContentContainer>
          <Navigation />
          <Social />
        </FooterMainContentContainer>
      </MainContentFooterContainerStyled>
      <Copyright />
    </FooterContainerStyled>
  );
};
