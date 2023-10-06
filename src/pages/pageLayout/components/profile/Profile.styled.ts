import { Avatar, styled } from '@mui/material';

export const ProfileContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TextStyled = styled('p')`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  color: ${({ theme }) => theme.palette.mainBlack};
  & span {
    margin-left: 5px;
  }
`;

export const RoleTextStyled = styled('p')`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  color: ${({ theme }) => theme.palette.mainGrey};
`;

export const AvatarStyled = styled(Avatar)`
  background-color: ${({ theme }) => theme.palette.accentColor};
`;
