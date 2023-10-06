import { styled } from '@mui/material';

export const FooterContainerStyled = styled('div')`
  grid-row: 3;
  padding: 26px 70px 14px 70px;
  background-color: ${({ theme }) => theme.palette.additionalDark};
  @media (min-width: 1335px) {
    padding: 52px 140px 28px 140px;
  }
`;
export const MainContentFooterContainerStyled = styled('div')`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  margin-bottom: 48px;
  @media (min-width: 1335px) {
    gap: 264px;
  }
`;
export const FooterMainContentContainer = styled('div')`
  display: flex;
  align-items: flex-start;

  @media (min-width: 1335px) {
    gap: 160px;
  }
`;
