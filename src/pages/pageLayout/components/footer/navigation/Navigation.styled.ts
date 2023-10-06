import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const NavigationContainerStyled = styled('div')`
  width: 240px;
`;

export const TitleTextStyled = styled('p')`
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  color: ${({ theme }) => theme.palette.mainColor};
  margin-bottom: 12px;
`;

export const NavigationListStyled = styled('ul')`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NavigationLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.mainColor};
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  transition: color ${({ theme }) => theme.transitions.easing.easeOut};
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.palette.accentColor};
  }
`;
