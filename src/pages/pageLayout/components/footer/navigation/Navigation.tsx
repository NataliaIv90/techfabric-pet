import {
  NavigationContainerStyled,
  NavigationLinkStyled,
  NavigationListStyled,
  TitleTextStyled,
} from './Navigation.styled';

const navigationList = [
  { text: 'Home Page', link: '/' },
  { text: 'Tags', link: '/search?query=+&category=tags' },
  { text: 'Favorites', link: '/favorites' },
  { text: 'Contact Us', link: '/contact' },
  { text: 'Rules', link: '/rules' },
];

export const Navigation = () => {
  return (
    <NavigationContainerStyled>
      <TitleTextStyled>Sections</TitleTextStyled>
      <NavigationListStyled>
        {navigationList.map(({ link, text }) => (
          <li key={text}>
            <NavigationLinkStyled to={link}>{text}</NavigationLinkStyled>
          </li>
        ))}
      </NavigationListStyled>
    </NavigationContainerStyled>
  );
};
