import { Button, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const HeaderContainerStyled = styled('div')`
  grid-row: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 70px;
  gap: 24px;
  @media (min-width: 1280px) {
    padding: 28px 140px;
    gap: 48px;
  }
`;

export const MainContentContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 30px;
  flex-grow: 1;
  @media (min-width: 1280px) {
    gap: 60px;
  }
`;

export const ButtonContainerStyled = styled('div')`
  display: flex;
  gap: 4px;
  @media (min-width: 1280px) {
    gap: 12px;
  }
`;

export const ButtonStyled = styled(Button)`
  width: 150px;
  @media (min-width: 1280px) {
    width: 200px;
  }
`;
export const CloseButtonStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  transition: ${({ theme }) => theme.transitions.easing.easeOut};
  color: ${({ theme }) => theme.palette.additionalDark};
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.palette.accentColor};
  }
`;

export const ProfileContainerWithButton = styled('div')`
  display: flex;
  gap: 24px;
`;
