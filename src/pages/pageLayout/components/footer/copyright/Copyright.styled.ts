import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const CopyrightContainerStyled = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CopyrightTextStyled = styled('p')`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  color: #939393;
`;

export const CopyrightListStyled = styled('ul')`
  display: flex;
  gap: 68px;
`;

export const CopyrightLinkStyled = styled(NavLink)`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  color: #939393;
  text-decoration: none;
`;
