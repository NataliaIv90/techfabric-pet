import {
  FacebookIconStyled,
  InstagramIconStyled,
  SocialContainerStyled,
  SocialListStyled,
  SocialTitleTextStyled,
  TwitterIconStyled,
} from './Social.styled';

import { NavLink } from 'react-router-dom';
const socialList = [
  {
    icon: <FacebookIconStyled />,
    link: 'https://www.facebook.com/techfabrichq/',
  },
  {
    icon: <InstagramIconStyled />,
    link: 'https://www.instagram.com/tech_fabric/',
  },
  {
    icon: <TwitterIconStyled />,
    link: 'https://twitter.com/tech_fabric',
  },
];

export const Social = () => {
  return (
    <SocialContainerStyled>
      <SocialTitleTextStyled>Follow Us</SocialTitleTextStyled>
      <SocialListStyled>
        {socialList.map(({ icon, link }) => (
          <li key={link}>
            <NavLink to={link} target='_blank'>{icon}</NavLink>
          </li>
        ))}
      </SocialListStyled>
    </SocialContainerStyled>
  );
};
