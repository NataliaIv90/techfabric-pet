import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { styled } from '@mui/material';

export const SocialContainerStyled = styled('div')``;
export const SocialTitleTextStyled = styled('p')`
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  color: ${({ theme }) => theme.palette.mainColor};
`;

export const SocialListStyled = styled('ul')`
  display: flex;
  gap: 24px;
`;

export const FacebookIconStyled = styled(FacebookIcon)`
  &.MuiSvgIcon-root {
    width: 32px;
    height: 32px;
    fill: ${({ theme }) => theme.palette.mainColor};
    transition: fill ${({ theme }) => theme.transitions.easing.easeOut};
  }
  &.MuiSvgIcon-root:hover,
  &.MuiSvgIcon-root:focus {
    fill: ${({ theme }) => theme.palette.accentColor};
  }
`;
export const InstagramIconStyled = styled(InstagramIcon)`
  &.MuiSvgIcon-root {
    width: 32px;
    height: 32px;
    fill: ${({ theme }) => theme.palette.mainColor};
    transition: fill ${({ theme }) => theme.transitions.easing.easeOut};
  }
  &.MuiSvgIcon-root:hover,
  &.MuiSvgIcon-root:focus {
    fill: ${({ theme }) => theme.palette.accentColor};
  }
`;
export const TwitterIconStyled = styled(TwitterIcon)`
  &.MuiSvgIcon-root {
    width: 32px;
    height: 32px;
    fill: ${({ theme }) => theme.palette.mainColor};
    transition: fill ${({ theme }) => theme.transitions.easing.easeOut};
  }
  &.MuiSvgIcon-root:hover,
  &.MuiSvgIcon-root:focus {
    fill: ${({ theme }) => theme.palette.accentColor};
  }
`;
