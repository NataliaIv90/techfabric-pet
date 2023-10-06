import {
  CopyrightContainerStyled,
  CopyrightLinkStyled,
  CopyrightListStyled,
  CopyrightTextStyled,
} from './Copyright.styled';

const listLinks = [
  { text: 'Contact Us', link: '/contact' },
  { text: 'Privacy Policy', link: '/privacy' },
  { text: 'Terms of Use', link: '/termsOfUse' },
];

export const Copyright = () => {
  return (
    <CopyrightContainerStyled>
      <CopyrightTextStyled>Copyright © {new Date().getFullYear()} PIXELPLAY</CopyrightTextStyled>
      <CopyrightListStyled>
        {listLinks.map(({ text, link }) => (
          <li key={text}>
            <CopyrightLinkStyled to={link}>{text}</CopyrightLinkStyled>
          </li>
        ))}
      </CopyrightListStyled>
    </CopyrightContainerStyled>
  );
};
